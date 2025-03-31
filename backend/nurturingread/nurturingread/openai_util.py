import sys
import os
import json
import time
import re
import requests
import string
import random
from openai import OpenAI, audio, OpenAIError

GPT_MODEL_LIST =  ["gpt-4-turbo-preview", "gpt-3.5-turbo-1106"]
IMAGE_SIZE_LIST = ["256x256", "512x512", "1024x1024"]
DEFAULT_GPT_MODEL = GPT_MODEL_LIST[0]

########################### prompt generation ##########################
# transfer story to sections
# ~ SYSTEM_PROMPT_SECTION  = "You will receive a child's story. Your task is "\
		# ~ "to devide the story to multiple parts. Each part should contains "\
		# ~ "various number of words which in turn have a total number of "\
		# ~ "syllables ranged from 12 to 24 syllables. "\
		# ~ "Do not separate a sentence to multiple parts. "\
		# ~ "The output should be in json format with the field 'sections'. "\
		# ~ "'sections' should content a list of strings, each string is a "\
		# ~ "section of the story."
SYSTEM_PROMPT_SECTION  = "You will receive a child's story. Your task is "\
		"to devide the story to multiple parts. Each part should contains "\
		"various number of words which in turn have a total number of "\
		"syllables ranged from 12 to 24 syllables. "\
		"Do not separate a sentence to multiple parts. "\
		"Keep the same sentence in one section. "\
		"Do not separate sections at commas. "\
		"The output should be in json format with the field 'sections'. "\
		"'sections' should content a list of strings, each string is a "\
		"section of the story."

# make question for a section of the story
SYSTEM_PROMPT_QUESTION = "You will act like a dialogic reading expert." \
				"You will receieve the a story with a title and story content." \
				"You will also receive a section of the story."\
				"Your task is to generate one question for children of 3 to 6 years"\
				"old using completion, recall and wh- in the CROWD strategies "\
				"in dialogic reading. "\
				"The question should be multiple choice question. "\
				"The question should be answered "\
				"from the content of the section. The question should have four choices. "\
				"The question should have exactly one correct choice. "\
				"You need to generate output in specified JSON format. "\
				"You will perform the task using the following steps: "\
				"1. understand the story and generate one multiple-choice question "\
				"for the section of the story. "\
				"2. check the question and the story again, make sure the "\
				"question and answer is are consistent with the story and "\
				"it can be answered using the content of the section alone."\
				"if there is ambiguity or inconsistency, or if it cannot "\
				"be answered using the section re-generate the question and choices. "\
				"3. for each choice of the question, generate four possible responses. "\
				"make sure there are 16 responses generated. "\
				"4. create the JSON object for the question. It should have "\
				"the following fields: "\
				"'question', 'options'. 'question' field is a string of the question text. "\
				"'options' is an array "\
				"5. add the choices to the 'options' array of the JSON object. "\
				"Each choice is a JSON object. "\
				"The choice object has the following fields: 'option', 'flag'. "\
				"'option' is a String of the choice text, 'flag' is a boolean value. "\
				"If the choice is correct, set the value as true. "\
				"If the choice is wrong, set the value as false. "\
				"append this JSON object to the array in 'options' field of the question. "\
				"7. make sure the JSON object is valid. "\
				"8. output the string that represents the JSON object. "\
				"No not output anything other than the JSON object."

# make prompt for background image for a section
SYSTEM_PROMPT_IMAGE_STORY2PROMPT = 'You will receive a title of a children story, and '\
				+ 'one section of the story. Your task is to generate '\
				+ 'keywords that can be used as prompt for a text-to-image '\
				+ 'generative model. The keywords should capture the main '\
				+ 'scene in the section, and the generated image is intended '\
				+ 'to be used as background image of children book. '\
				+ 'Do not include name of characters in the prompt. '\
				+ 'Ouput in this json format: {"prompt": generated-prompt-string}'
	
# make prompt for cover image from story summary
SYSTEM_PROMPT_IMAGE_SUMMARY2PROMPT = 'You will receive a summary of a children story. '\
				+ 'Your task is to generate '\
				+ 'keywords that can be used as prompt for a text-to-image '\
				+ 'generative model. The keywords should capture the main '\
				+ 'scene in the section, and the generated image is intended '\
				+ 'to be used as cover image of children book. '\
				+ 'Do not include name of characters or title of the story in the prompt. '\
				+ 'Ouput in this json format: {"prompt": generated-prompt-string}'
						

def generate_story_prompt(story_options):
	
	topic = story_options['story_topic']
	age_range = story_options['age_range']
	length = story_options['story_length']
	
	system_prompt = "You will act like a child psychologist and an expert " \
		+ "in writing children's picture book for children aged between "\
		+ age_range+". You are going to write a story based on user's requirement. "\
		+ "You are the quality controller of the stories so please ensure "\
		+ "that you select the story that is engaging and educational for children aged " + age_range\
		+ ". User will provide a topic for the story and other requirements. "\
		+ "You can only use the characters from the following list in your story:"\
		+ '"list": [{"title": "Luna the Adventurous Bunny", "Name": " Luna", "Age": " 5 years old (in bunny years)", "Species": " Bunny", "Body Type": " Small and slightly chubby", "Skin/Fur Color": " Soft white fur", "Hair": " N/A", "Eyes": " Big, round blue eyes with an inquisitive look", "Distinctive Features": " A tiny pink nose, long floppy ears", "Outfit": " Wears a green explorer\'s vest with multiple pockets and a small red bandana around her neck", "Accessories": " Carries a small magnifying glass and a brown leather satchel", "Colors and Patterns": " Vest is olive green with brass buttons, bandana is bright red with white polka dots", "Personality Traits": " Brave, curious, and kind-hearted", "Facial Expressions": " Usually smiling with wide eyes, often looks determined", "Posture and Movement": " Stands with a slight forward lean, ready to hop into action"}, {"title": "Bella the Gentle Bear", "Name": " Bella", "Age": " 7 years old (in bear years)", "Species": " Bear", "Body Type": " Large and cuddly", "Height": " About the height of a grown adult", "Skin/Fur Color": " Thick, light brown fur", "Hair": " N/A", "Eyes": " Warm, brown eyes that convey kindness", "Distinctive Features": " A soft, round belly and a friendly smile", "Outfit": " Wears a pink apron with floral patterns", "Accessories": " Carries a basket of berries or honey", "Colors and Patterns": " Apron is light pink with small white flowers", "Personality Traits": " Gentle, nurturing, and caring", "Facial Expressions": " Often smiling, looks compassionate and understanding", "Posture and Movement": " Moves slowly and deliberately, often sitting or standing still"}, {"title": "Finn the Friendly Fox", "Name": " Finn", "Age": " 5 years old (in fox years)", "Species": " Fox", "Body Type": " Slim and agile", "Height": " About the height of a medium-sized dog", "Skin/Fur Color": " Bright orange fur with a white underbelly and black-tipped ears", "Hair": " N/A", "Eyes": " Bright green eyes full of friendliness", "Distinctive Features": " A bushy tail with a white tip and a constant grin", "Outfit": " Wears a green scarf and a small hat", "Accessories": " Often seen with a walking stick", "Colors and Patterns": " Scarf is dark green, hat is brown", "Personality Traits": " Friendly, clever, and resourceful", "Facial Expressions": " Always grinning, eyes sparkling with mischief", "Posture and Movement": " Moves quickly and gracefully, often crouching low to the ground"}, {"title": "Ellie the Elegant Elephant", "Name": " Ellie", "Age": " 12 years old (in elephant years)", "Species": " Elephant", "Body Type": " Large and sturdy", "Height": " About the height of a two-story building", "Skin/Fur Color": " Gray skin with a smooth texture", "Hair": " N/A", "Eyes": " Large, kind gray eyes", "Distinctive Features": " Long trunk, large ears, and tusks adorned with gold rings", "Outfit": " Wears a royal purple cape with golden embroidery", "Accessories": " Has a golden tiara", "Colors and Patterns": " Cape is royal purple with intricate gold patterns", "Personality Traits": " Elegant, wise, and graceful", "Facial Expressions": " Usually looks calm and serene, often smiling gently", "Posture and Movement": " Moves slowly and gracefully, stands tall with dignity"}, {"title": "Gary the Gentle Gorilla", "Name": " Gary", "Age": " 10 years old (in gorilla years)", "Species": " Gorilla", "Body Type": " Large and muscular", "Height": " About the height of a tall adult", "Skin/Fur Color": " Black fur with a silverback", "Hair": " N/A", "Eyes": " Soft brown eyes", "Distinctive Features": " Broad shoulders, a kind expression", "Outfit": " Wears a green gardeners apron", "Accessories": " Often seen with a watering can", "Colors and Patterns": " Apron is green with pockets filled with gardening tools", "Personality Traits": " Gentle, nurturing, and patient", "Facial Expressions": " Often smiling gently, looks thoughtful", "Posture and Movement": " Moves slowly and carefully, often crouching to tend plants"}'\
		+ "The story should include at least two of the elements that "\
		+ "make the story fun to read aloud including rhyme and rhythm, "\
		+ "onomatopoeia, dialogue, prompting the readers to do various voices (of animals or anything). "\
		+ "The point of view of the story should be either from a "\
		+ "close thrid person point of view (i.e., readers can "\
		+ "understand the protagonist's mind) or first person point "\
		+ "of view (i.e., the protagonist is telling the story ). "\
		+ "Keep the sentences simple and use simple words in the story. "\
		+ "The story should be easy to understand for children aged between " + age_range\
		+ "The main character, conflicts and objectives of the story "\
		+ "should be introduced in the first 50 words of the story. "\
		+ "Make sure the story only contains printable ASCII characters. " \
		+ "You will perform the task with the following steps: "\
		+ "1. choose characters from the character list. "\
		+ "2. generate a story with required length. Make sure all requirements "\
		+ "are fulfilled and only characters in the character list are in the story. "\
		+ "Also make sure the story is logical. "\
		+ "3. generate a short summary for the story. The summary should be less than 50 words. "\
		+ "4. Output the story in 	JSON format with the fields 'title', 'content', 'topic', "\
		+ "'summary'. 'title' should contain the title of the generated story. "\
		+ "'content' should be a string, it contains the full story. "\
		+ "'topic' should be the topic provided by user. "\
		+ "'summary' should be the summary of the story."
		
	user_prompt = "Topic: " + topic + ". Length: " + str(length) + ". "\
		+ "Create a story in which the characters using a regulation strategy " \
		+ topic +", to regulate their emotions and behaviours for children "\
		+ "aged " + age_range + ". The story should help teaching young readers " + topic \
		+ ", and should keep the younger readers engaged."
	 
	return system_prompt, user_prompt
	
	
def generate_response_system_prompt(age_range, num_response):
	return "You will act like a dialogic reading expert. "\
		+ "You will also receive a section of the story, a multiple "\
		+ "choice question, four choices, the correct choice and the "\
		+ "choice selected by a child of " + age_range + " years. "\
		+ "Your task is to generate " + str(num_response) + " responses for the child. "\
		+ "You should use growth mindset language in responses. "\
		+ "If the choice is the right answer, give praises and "\
		+ "encourage the child to move on to reading. "\
		+ "If the choice is the wrong answer, give praises for "\
		+ "the child's effort for answering the question, then "\
		+ "you could ask additional questions and adding new "\
		+ "information to help them see things differently. "\
		+ "Do not reveal correct answer in responses for wrong choices."\
		+ "Keep the responses concise and encouraging. "\
		+ "You need to generate output in specified JSON format. "\
		+ "You will perform the task using the following steps: "\
		+ "1. understand the story and the multiple-choice question. "\
		+ "2. for the choice selected by the child, generate four possible responses. "\
		+ "3. create the JSON object for the choice. "\
		+ "The choice object has the following fields: 'option', 'flag', 'responses'. "\
		+ "'option' is a String of the choice text, 'flag' is a boolean value. "\
		+ "If the choice is correct, set the value as true. "\
		+ "If the choice is wrong, set the value as false. "\
		+ "'responses' is an array "\
		+ "4. add the generated responses to the choices. Each response is one "\
		+ "element in the 'responses' array of the choice in String format. "\
		+ "After this step, the 'responses' array should have " + str(num_response) + " elements. "\
		+ "5. make sure the JSON object is valid. "\
		+ "6. output the string that represents the JSON object. "\
		+ "No not output anything other than the JSON object."

########################## content generation ##########################

# generate a flag for every section to decide if there is a question after the section
def add_question_flag(story, interval=[2,3]):
	num_section = len(story['sections'])
	flag_list = [False]*num_section
	pointer = 0
	while pointer < num_section:
		pointer += random.randint(interval[0], interval[1])
		if pointer < num_section:
			flag_list[pointer] = True
	for idx in range(num_section):
		story['sections'][idx]['has_question'] = flag_list[idx]
		
	return story


def generate_story(prompt_data, target_dir, user_choices):
	model = prompt_data['model']
	prompt = [
		{"role": "system", "content": prompt_data['system_prompt']},
		{"role": "user", "content": prompt_data['user_prompt']}
	]
	response = generate_text(prompt, model)
	
	if not os.path.isdir(target_dir):
		os.makedirs(target_dir)
	filename = os.path.join(target_dir, 'story.json')
	with open(filename, 'w') as output_file:
		output_file.write(response)
		
	# make story sections
	story = json.loads(response)
	input_story = story['content'].replace("\n", "")
	messages = [
    {"role": "system", "content": SYSTEM_PROMPT_SECTION},
    {"role": "user", "content": input_story}
	]
	response = generate_text(messages)
	response = json.loads(response)
	section_list = response['sections']
	del story['content']
	sections = []
	for section in section_list:
		sections.append({"content": section, "questions": []})
	story['sections'] = sections
	story = add_question_flag(story)
	story['generation'] = prompt_data | user_choices
	output_filename = os.path.join(target_dir, 'story_section.json')
	with open(output_filename, 'w', encoding='utf-8') as f:
		json.dump(story, f, ensure_ascii=False, indent=4)


def find_question_section(story, section_idx):
	output = ""
	start = section_idx-1
	flag = False
	print(section_idx)
	while start > 0 and (not flag):
		print(start)
		if story['sections'][start]['has_question']:
			flag = True
		else:
			start = start - 1
	start = start + 1
	for idx in range(start, section_idx + 1):
		output += story['sections'][start]['content']
	return output


PREFIX_1 = ['A)', 'B)', 'C)', 'D)']
PREFIX_2 = ['A.', 'B.', 'C.', 'D.']

# section_idx==None -> generate question for every section
# section_idx==n -> generate story for n-th section
def generate_question(story_dir, section_idx=None):
	#read from latest version of story
	input_filename = os.path.join(story_dir, 'story_section_question_clean.json')
	if not os.path.isfile(input_filename):
		input_filename = os.path.join(story_dir, 'story_section.json')
	with open(input_filename, 'r') as openfile:
		story = json.load(openfile)

	full_story = ""
	for section in story['sections']:
		full_story += section['content'] + ' '
		
	num_section = len(story['sections'])
	section_list = range(num_section)
	if (section_idx is not None) and section_idx >= 0 and section_idx < num_section:
		section_list = [section_idx]
	for idx in section_list:
		section = story['sections'][idx]
		if not section['has_question']:
			section['questions'] = []
			continue
		question_section = find_question_section(story, idx)
		flag = False
		while not flag:
			user_prompt = "title : "+story['title']+" story: "+full_story+" section: "+question_section
			messages = [
				{"role": "system", "content": SYSTEM_PROMPT_QUESTION},
				{"role": "user", "content": user_prompt}
			]
	
			response = generate_text(messages)
			print(response)
			question = json.loads(response)
			#validate number of correct and incorrect answers
			correct_count = 0
			incorrect_count = 0
			for choice_json in question['options']:
				 if choice_json['flag']:
					 correct_count += 1
				 else:
					 incorrect_count += 1
			if correct_count == 1 and incorrect_count == 3:
				flag = True
			else:
				print('wrong number of answers')
			#time.sleep(10)
		# ~ section['questions'].append(question)
		section['questions'] = [question]
	
	output_filename = os.path.join(story_dir, 'story_section_question.json')
	with open(output_filename, 'w', encoding='utf-8') as f:
		json.dump(story, f, ensure_ascii=False, indent=4)

	# cleanup format
	for section in story['sections']:
		if not section['has_question']:
			continue
		question = section['questions'][0]['question']
		for choice_idx in range(len(section['questions'][0]['options'])):
			choice_json = section['questions'][0]['options'][choice_idx]
			if (choice_json['option'].startswith(PREFIX_1[choice_idx])):
				choice_json['option'] = choice_json['option'][len(PREFIX_1[choice_idx]):].strip()
			elif (choice_json['option'].startswith(PREFIX_2[choice_idx])):
				choice_json['option'] = choice_json['option'][len(PREFIX_2[choice_idx]):].strip()
	
	output_filename = os.path.join(story_dir, 'story_section_question_clean.json')
	with open(output_filename, 'w', encoding='utf-8') as f:
		json.dump(story, f, ensure_ascii=False, indent=4)


# section_idx==None -> generate question for every section
# section_idx==n -> generate story for n-th section
def generate_response(story_dir, section_idx=None, target_choice_idx=None, number_of_responses=2):
	input_filename = os.path.join(story_dir, 'story_section_question_clean.json')
	with open(input_filename, 'r') as openfile:
		story = json.load(openfile)
		
	num_section = len(story['sections'])
	section_list = range(num_section)
	if (section_idx is not None) and section_idx >= 0 and section_idx < num_section:
		section_list = [section_idx]
		
	age_range = story['generation']['age_range']
	system_prompt = generate_response_system_prompt(age_range, number_of_responses)
		
	for idx in section_list:
		section = story['sections'][idx]
		if not section['has_question']:
			continue
		# ~ story_section = section['content']
		story_section = find_question_section(story, idx)
		question = section['questions'][0]['question']
		choices = []
		for choice_json in section['questions'][0]['options']:
			choices.append(choice_json['option'])
			if choice_json['flag']:
				correct_choice = choice_json['option']
		
		choice_list = range(len(section['questions'][0]['options']))
		if target_choice_idx is not None:
			choice_list = [target_choice_idx]
		for choice_idx in choice_list:
			choice_json = section['questions'][0]['options'][choice_idx]
			flag = False		
			while not flag:
				user_prompt = "story section: "+story_section\
						+" question: "+question\
						+" choices: "+str(choices)\
						+". correct choice: "+correct_choice\
						+". selected choice: " + choice_json['option']
			
				messages = [
					{"role": "system", "content": system_prompt},
					{"role": "user", "content": user_prompt}
				]
				
				response = generate_text(messages)
				print(response)
				generated_choice = json.loads(response)
				if (len(generated_choice['responses']) == number_of_responses):
					flag = True
				#time.sleep(10)
			section['questions'][0]['options'][choice_idx] = generated_choice
		
	with open(input_filename, 'w', encoding='utf-8') as f:
		json.dump(story, f, ensure_ascii=False, indent=4)
		

def convert_story_to_prompt(story_section, system_prompt=SYSTEM_PROMPT_IMAGE_STORY2PROMPT):
	messages = [
			{"role": "system", "content": system_prompt},
			{"role": "user", "content": story_section}
	]
	
	response = generate_text(messages)
	print(response)
	return json.loads(response)['prompt']


def generate_story_cover(story_dir):
	story_file = os.path.join(story_dir, 'story_section_question_clean.json')
	image_file = os.path.join(story_dir, 'image', 'story_cover.jpg')
	if not os.path.isdir(os.path.dirname(image_file)):
		os.makedirs(os.path.dirname(image_file))
	with open(story_file, 'r') as openfile:
		story = json.load(openfile)
		
	story_summary = story['summary']
	story_title = story['title']
	
	# ~ prompt = "You will receive a story title and the story summary. You need to \
	# ~ generate a cover image for the story. Do not include the any characters \
	# ~ in the cover iamge. Story title: " + story_title + " Story summary: " + story_summary
	
	prompt = story_summary
	prompt = convert_story_to_prompt(story_summary, system_prompt=SYSTEM_PROMPT_IMAGE_SUMMARY2PROMPT)
	
	image_url = generate_image(prompt)
	with open(image_file, 'wb') as f:
		f.write(requests.get(image_url).content)


def generate_story_image(story_dir, section_idx=None):
	story_file = os.path.join(story_dir, 'story_section_question_clean.json')
	save_dir = os.path.join(story_dir, 'image')
	if not os.path.isdir(save_dir):
		os.makedirs(save_dir)
	
	with open(story_file, 'r') as openfile:
		story = json.load(openfile)
	
	num_section = len(story['sections'])
	section_list = range(num_section)
	if (section_idx is not None) and section_idx >= 0 and section_idx < num_section:
		section_list = [section_idx]
		
	for idx in section_list:
		section = story['sections'][idx]
		story_section = section['content']
		prompt = convert_story_to_prompt(story_section)
		
		image_url = generate_image(prompt)
		image_file = os.path.join(save_dir, 'section'+str(idx+1).zfill(3)+'.jpg')
		with open(image_file, 'wb') as f:
			f.write(requests.get(image_url).content)
		#time.sleep(10)


def generate_audio(story_dir, voice="shimmer"):
	story_file = os.path.join(story_dir, 'story_section_question_clean.json')
	save_dir = os.path.join(story_dir, 'audio')
	if not os.path.isdir(save_dir):
		os.makedirs(save_dir)
		
	# ~ story_name = os.path.basename(story_file)[:-5]
	with open(story_file, 'r') as openfile:
		story = json.load(openfile)

	for section_idx in range(len(story['sections'])):
		section = story['sections'][section_idx]
		output_file = os.path.join(save_dir, 'section'+str(section_idx+1).zfill(2)+'.mp3')
		generate_speech(section['content'], output_file, voice=voice)
		
		for question_idx in range(len(section['questions'])):
			question = section['questions'][question_idx]
			output_file = os.path.join(save_dir, 'section'+str(section_idx+1).zfill(2)+'_question'+str(question_idx+1).zfill(2)+'.mp3')
			generate_speech(question['question'], output_file, voice=voice)
			
			for choice_idx in range(len(question['options'])):
				choice = question['options'][choice_idx]
				
				for response_idx in range(len(choice['responses'])):
					response = choice['responses'][response_idx]
					output_file = os.path.join(save_dir, 'section'+str(section_idx+1).zfill(2)+'_question'+str(question_idx+1).zfill(2)+'_choice'+str(choice_idx+1).zfill(2)+'_response'+str(response_idx+1).zfill(2)+'.mp3')
					generate_speech(response, output_file, voice=voice)


############################ openai API ################################

def generate_text(prompt, model=DEFAULT_GPT_MODEL, filename=None, filter_printable=True):
	client = OpenAI()
	try:
		completion = client.chat.completions.create(
			model=model,
			messages=prompt,
			response_format={ "type": "json_object" },
		)
	except OpenAIError as e:
		print(e.http_status)
		print(e.error)
		return None

	message = completion.choices[0].message.content
	if filter_printable:
		printable = set(string.printable)
		message = ''.join(filter(lambda x: x in printable, message))
	return message


def generate_speech(text, filename, model="tts-1", voice="shimmer"):
	client = OpenAI()
	try:
		response = audio.speech.create(
			model=model,
			voice=voice,
			input=text,
		)
	except OpenAIError as e:
		print(e.http_status)
		print(e.error)
		return None
		
	response.stream_to_file(filename)


def generate_image(prompt, model="dall-e-3", size="1024x1024", filename=None):
	client = OpenAI()
	try:
		response = client.images.generate(
		  model=model,
		  prompt=prompt,
		  size=size,
		  quality="standard",
		  n=1,
		)
	except OpenAIError as e:
		print(e.http_status)
		print(e.error)
		return None
		
	image_url = response.data[0].url
	
	if filename is not None:
		with open(filename, 'wb') as f:
			f.write(requests.get(image_url).content)
	
	return image_url
