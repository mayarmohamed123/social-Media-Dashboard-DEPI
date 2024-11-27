from django.db import models
from users.models import User
import os


class Post(models.Model):
    caption = models.TextField(default="", blank=True)
    picture = models.ImageField(upload_to="posts/%Y/%m/%d/", null=True, blank=True)
    date_posted = models.DateField(auto_now_add=True)
    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    likes = models.ManyToManyField(User, related_name='likes', blank=True)

    class Meta:
        ordering = ['-id']

    def __str__(self):
        return f"{self.owner.get_full_name()}'s post - {self.date_posted}"

    def delete(self, using=None, keep_parents=False):
        if self.picture:
            if os.path.isfile(self.picture.path):
                os.remove(self.picture.path)
        super(Post, self).delete(using, keep_parents)


class Comment(models.Model):
    content = models.TextField(default="", blank=True)
    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    post = models.ForeignKey(Post, on_delete=models.CASCADE)
    date = models.DateField(auto_now_add=True)

    def __str__(self):
        return f"comment for post {self.post.id}"
