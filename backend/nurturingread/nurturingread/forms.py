from django import forms

from .openai_util import GPT_MODEL_LIST

tone_choices = [
    ('funny', 'funny'),
    ('poignant',"poignant"),
    ('sweet',"sweet"),
    ('positive',"positive"),
    ('quirky',"quirky"),
    ('silly',"silly")
]

reading_elements = [
	('rhyme and rhythm', 'rhyme and rhythm'),
    ('onomatopoeia',"onomatopoeia"),
    ('dialogue',"dialogue"),
    ('prompting the readers to do various voices',"prompting the readers to do various voices")
]

def list_to_choice(input_list):
	output = []
	for item in input_list:
		output.append((item, item))
	return output

class StoryForm(forms.Form):
	
	story_length = forms.IntegerField(label="Story length", initial=300, min_value=50, max_value=1000)
	story_topic = forms.CharField(label="Story topic", max_length=100)
	age_range = forms.CharField(label="Age range", initial="3 to 6", max_length=100)
	tone = forms.ChoiceField(label="Story tone", choices=tone_choices, initial="funny")
	
class StoryPromptForm(forms.Form):
	system_prompt = forms.CharField(label="System prompt", widget=forms.Textarea)
	user_prompt = forms.CharField(label="User prompt", widget=forms.Textarea)
	model = forms.ChoiceField(label="GPT model", choices=list_to_choice(GPT_MODEL_LIST))
    
