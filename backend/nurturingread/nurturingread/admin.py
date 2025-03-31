import os
import json
from pathlib import Path
import shutil

from django.contrib import admin
from django.http import HttpResponse, HttpResponseRedirect
from django.template import loader
from django.urls import path
from django.shortcuts import render
from django.conf.urls.static import static
from django.core.management import call_command
from django.contrib.auth.models import Group as DjangoGroup
from django.contrib.auth.models import User as DjangoUser

from .forms import StoryForm, StoryPromptForm
from .openai_util import generate_story_prompt, generate_story, \
	generate_question, generate_response, generate_story_cover, \
	generate_story_image, generate_audio
from .settings import FILE_PATH_FIELD_DIRECTORY, MEDIA_ROOT, \
	MEDIA_URL, DEBUG


TEMP_DIR_NAME = 'create_story_temp'

# creates a empty folder in MEDIA_ROOT
# delete existing folders from previouse session
def get_temp_story_dir():
	target_dir = os.path.join(MEDIA_ROOT, TEMP_DIR_NAME)
	# ~ if os.path.isdir(target_dir):
		# ~ shutil.rmtree(target_dir)
	# ~ os.makedirs(target_dir)
	return target_dir


def get_next_story_dir():
	idx = 1
	target_dir = os.path.join(FILE_PATH_FIELD_DIRECTORY, 
					'story'+str(idx).zfill(3))
	flag = os.path.isdir(target_dir)
	while flag:
		idx += 1
		target_dir = os.path.join(FILE_PATH_FIELD_DIRECTORY, 
						'story'+str(idx).zfill(3))
		flag = os.path.isdir(target_dir)
	return target_dir


def get_raw_story(story_dir):
	story_file = os.path.join(story_dir, 'story.json')
	with open(story_file, 'r') as openfile:
		story = json.load(openfile)
		
	return story
	

def get_sectioned_story(story_dir):
	story_file = os.path.join(story_dir, 'story_section.json')
	with open(story_file, 'r') as openfile:
		story = json.load(openfile)
		
	return story
	
def get_final_story(story_dir):
	story_file = os.path.join(story_dir, 'story_section_question_clean.json')
	if not os.path.isfile(story_file):
		return None
	with open(story_file, 'r') as openfile:
		story = json.load(openfile)
		
	return story
	
def image_file_to_url(image_filename):
	return image_filename


def story_has_response(story):
	
	for section in story['sections']:
		if not section['has_question']:
			continue
		if ('responses' in section["questions"][0]["options"][0]):
			return True
		else:
			return False



#TODO: move these to book's model admin
class MyAdminSite(admin.AdminSite):
	index_template = 'admin/index.html'
	
	story_prompt_data = None
	curr_story_dir = get_temp_story_dir()
	
	# entering this page always delete unsaved story from previous session
	def story_generation_view(self, request):
		# if this is a POST request we need to process the form data
		if request.method == "POST":
			# create a form instance and populate it with data from the request:
			form = StoryForm(request.POST)
			# check whether it's valid:
			if form.is_valid():
				data = form.cleaned_data
				# ~ print(data)
				self.story_prompt_data = data
				self.curr_story_dir = get_temp_story_dir()
				return HttpResponseRedirect("/admin/story_prompt/")

		# if a GET (or any other method) we'll create a blank form
		else:
			form = StoryForm()

		return render(request, 
						"admin/story_generation/story_generation.html",
						{"form": form})
		
	def story_prompt_view(self, request):
		if not self.story_prompt_data:
			print('prompt data not set')
		system_prompt, user_prompt = generate_story_prompt(self.story_prompt_data)
		
		if request.method == "POST":
			form = StoryPromptForm(request.POST)
			if form.is_valid():
				data = form.cleaned_data
				generate_story(data, self.curr_story_dir, self.story_prompt_data)
				return HttpResponseRedirect("/admin/story_preview/")
		else:
			data = {'system_prompt':system_prompt, 'user_prompt':user_prompt}
			form = StoryPromptForm(data)

		return render(request, 
						"admin/story_generation/story_prompt.html",
						{"form": form})
		
	def story_preview_view(self, request):
		print(self.curr_story_dir)
		story = get_sectioned_story(self.curr_story_dir)
		return render(request, 
						"admin/story_generation/story_preview.html",
						{"story": story})
		
	# final story file exists implies questions has been generated
	def question_view(self, request, section_idx=None):
		story = get_final_story(self.curr_story_dir)
		if (not story) or (section_idx is not None):
			generate_question(self.curr_story_dir, section_idx)
			story = get_final_story(self.curr_story_dir)
			
		return render(request, 
						"admin/story_generation/question_preview.html",
						{"story": story})
		
	# need to check if response is already generated
	def response_view(self, request, section_idx=None, choice_idx=None):
		story = get_final_story(self.curr_story_dir)
		if (not story_has_response(story) or (section_idx is not None)):
			generate_response(self.curr_story_dir, section_idx, choice_idx)
			story = get_final_story(self.curr_story_dir)
			
		return render(request, 
						"admin/story_generation/response_preview.html",
						{"story": story})
		
	# generate and display cover image
	def cover_image_view(self, request, generate=None):
		image_file = os.path.join(self.curr_story_dir, 'image', 'story_cover.jpg')	
		if (not os.path.isfile(image_file)) or (generate is not None):
			generate_story_cover(self.curr_story_dir)
		story = get_final_story(self.curr_story_dir)
			
		return render(request, 
						"admin/story_generation/cover_image.html",
						{"story": story, "image": TEMP_DIR_NAME+"/image/story_cover.jpg"})

	def image_view(self, request, section_idx=None):
		image_file = os.path.join(self.curr_story_dir, 'image', 'section001.jpg')	
		if (not os.path.isfile(image_file)) or (section_idx is not None):
			generate_story_image(self.curr_story_dir, section_idx)
		story = get_final_story(self.curr_story_dir)
		image_list = []
		for idx in range(len(story['sections'])):
			image_list.append(os.path.join(TEMP_DIR_NAME,
					'image', 'section'+str(idx+1).zfill(3)+'.jpg'))
		zipped = zip(story['sections'], image_list)
		return render(request, 
						"admin/story_generation/image_preview.html",
						{"story": story, "section_content": zipped})
		
	# do not need to display audios, add the story to database
	def audio_view(self, request):
		generate_audio(self.curr_story_dir)
		story_dir = get_next_story_dir()
		shutil.move(self.curr_story_dir, story_dir)
		p = Path(story_dir)
		# ~ call_command('add_story', p.name) 
		return render(request, 
						"admin/story_generation/audio_generated.html")

	def get_urls(self):

		urlpatterns_super = super().get_urls()
		urlpatterns = [
			path('story_generation/',
				self.admin_view(self.story_generation_view),
				name='story_generation'),
			path('story_prompt/', 
				self.admin_view(self.story_prompt_view),
				name='story_prompt'),
			path('story_preview/', 
				self.admin_view(self.story_preview_view),
				name='story_preview'),
			path('question_preview/',
				self.admin_view(self.question_view),
				name='question_preview'),
			path('question_preview/<int:section_idx>',
				self.admin_view(self.question_view),
				name='question_preview'),
			path('response_generation/',
				self.admin_view(self.response_view),
				name='response_generation'),
			path('response_generation/<int:section_idx>/<int:choice_idx>',
				self.admin_view(self.response_view),
				name='response_generation'),
			path('cover_image_generation/',
				self.admin_view(self.cover_image_view),
				name='cover_image_generation'),
			path('cover_image_generation/<str:generate>',
				self.admin_view(self.cover_image_view),
				name='cover_image_generation'),
			path('image_generation/',
				self.admin_view(self.image_view),
				name='image_generation'),
			path('image_generation/<int:section_idx>/',
				self.admin_view(self.image_view),
				name='image_generation'),
			path('audio_generation/',
				self.admin_view(self.audio_view),
				name='audio_generation')
		] + urlpatterns_super
		
		if DEBUG:
			urlpatterns.extend(static(MEDIA_URL, document_root=MEDIA_ROOT))
		return urlpatterns

custom_admin = MyAdminSite()
custom_admin.register(DjangoGroup)
custom_admin.register(DjangoUser)
