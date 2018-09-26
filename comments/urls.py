from django.conf.urls import url
from django.contrib import admin
from .views import (
	index,
	add_comment
)
urlpatterns = [
	url(r'^$', index, name = 'index'),
	url(r'^add_comment', add_comment, name = 'add_comment'),
]