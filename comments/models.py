from django.db import models

class Comment(models.Model):
    username = models.CharField(max_length = 150)
    email = models.EmailField(max_length = 254)
    content = models.TextField()
    timestamp = models.DateTimeField(auto_now = False, auto_now_add = True)
    
    def __str__(self):
        return self.content
    class Meta:
        verbose_name = 'комментарий'
        verbose_name_plural = 'комментарии'
        ordering = ["-timestamp"]