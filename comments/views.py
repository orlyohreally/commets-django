from django.shortcuts import render
from django.http import JsonResponse
import json
from .models import Comment
from .admin import CommentForm
def index(request):
    comments = Comment.objects.all()
    context = {
        "comments" : comments
    }
    return render(request, "comments/index.html", context)
def add_comment(request):
	form = CommentForm(request.POST or None)
	if(form.is_valid()):
		instance = form.save(commit=False)
		instance.save()
		status = 'success'
		message = 'Комментарий успешно добавлен'
	else:
		status = 'error'
		message = 'Проверьте указанные данные.'
	
	output_data = {
		'status': status,
		'message': message
	}
	return JsonResponse(output_data)
