from django.db import models
from django.contrib.auth.base_user import BaseUserManager
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from django.db.models.signals import post_save, post_delete

class AppUserManager(BaseUserManager):
	def create_user(self, email, password=None):
		if not email:
			raise ValueError('An email is required.')
		if not password:
			raise ValueError('A password is required.')
		email = self.normalize_email(email)
		user = self.model(email=email)
		user.set_password(password)
		user.save()
		return user
	def create_superuser(self, email, password=None):
		if not email:
			raise ValueError('An email is required.')
		if not password:
			raise ValueError('A password is required.')
		user = self.create_user(email, password)
		user.is_superuser = True
		user.save()
		return user


class AppUser(AbstractBaseUser, PermissionsMixin):
	PRIVATE = True
	PUBLIC = False
	VISIBILITY_CHOICES = (
        (PUBLIC, 'Public'),
        (PRIVATE, 'Private'),
    )
	user_id = models.AutoField(primary_key=True)
	email = models.EmailField(max_length=50, unique=True)
	username = models.CharField(max_length=50)
	private = models.BooleanField(default=False)
	name = models.CharField(max_length=20, null=True)
	visibility = models.BooleanField(default=PUBLIC, choices=VISIBILITY_CHOICES)
	bio = models.CharField(max_length=150, blank=True, null=True)
	profile_picture = models.ImageField(upload_to='profile_pics', default='default.png', blank=True, null=True)
	USERNAME_FIELD = 'email'
	REQUIRED_FIELDS = ['username']
	objects = AppUserManager()
	def __str__(self):
		return self.username
	
class Post(models.Model):
    author = models.ForeignKey(AppUser, on_delete=models.CASCADE)
    caption = models.TextField(blank=True, null=True)
    image = models.ImageField(upload_to='images/', null=False)
    created_at = models.DateTimeField(auto_now_add=True)
    likes = models.IntegerField(default=0)
    comments = models.ManyToManyField('Comment', related_name='post', null=True)

class CrashPadPost(models.Model):
    author = models.ForeignKey(AppUser, on_delete=models.CASCADE)
    text = models.CharField(max_length=200)
    location = models.CharField(max_length=30)
    created_at = models.DateTimeField(auto_now_add=True)

class Comment(models.Model):
    user_id = models.ForeignKey(AppUser, on_delete=models.CASCADE)
    post_id = models.ForeignKey(Post, on_delete=models.CASCADE, related_name="comment")
    text = models.CharField(max_length=150)
    created_at = models.DateTimeField(auto_now_add=True)

    def user_comment_post(sender, instance, *args, **kwargs):
        comment = instance
        post = comment.post
        text_preview = comment.body[:90]
        sender = comment.user
        notify = Notification(post=post, sender=sender, user=post.user, text_preview=text_preview, notification_types=2)
        notify.save()

    def user_del_comment_post(sender, instance, *args, **kwargs):
        comment = instance
        post = comment.post
        sender = comment.user
        notify = Notification.objects.filter(post=post, sender=sender, user=post.user, notification_types=2)
        notify.delete()

class Like(models.Model):
    user_id = models.ForeignKey(AppUser, on_delete=models.CASCADE)
    post_id = models.ForeignKey(Post, on_delete=models.CASCADE)
	
    def user_liked_post(sender, instance, *args, **kwargs):
        like = instance
        post = like.post
        sender = like.user
        notify = Notification(post=post, sender=sender, user=post.user)
        notify.save()

    def user_unliked_post(sender, instance, *args, **kwargs):
        like = instance
        post = like.post
        sender = like.user
        notify = Notification.objects.filter(post=post, sender=sender, notification_types=1)
        notify.delete()

class Notification(models.Model):
    NOTIFICATION_TYPES = ((1, 'Like'), (2, 'Comment'), (3, 'Follow'))

    post = models.ForeignKey(Post, on_delete=models.CASCADE, related_name="notification_post", null=True)
    sender = models.ForeignKey(AppUser, on_delete=models.CASCADE, related_name="notification_from_user" )
    user = models.ForeignKey(AppUser, on_delete=models.CASCADE, related_name="notification_to_user" )
    notification_types = models.IntegerField(choices=NOTIFICATION_TYPES, null=True, blank=True)
    text_preview = models.CharField(max_length=100, blank=True)
    date = models.DateTimeField(auto_now_add=True)
    is_seen = models.BooleanField(default=False)

class FollowerRelation(models.Model):
    follower = models.ForeignKey(AppUser, on_delete=models.CASCADE, related_name='following')
    following = models.ForeignKey(AppUser, on_delete=models.CASCADE, related_name='followers')
    timestamp = models.DateTimeField(auto_now_add=True)

    def user_follow(sender, instance, *args, **kwargs):
        follow = instance
        sender = follow.follower
        following = follow.following
        notify = Notification(sender=sender, user=following, notification_types=3)
        notify.save()

    def user_unfollow(sender, instance, *args, **kwargs):
        follow = instance
        sender = follow.follower
        following = follow.following
        notify = Notification.objects.filter(sender=sender, user=following, notification_types=3)
        notify.delete()

class SavedPost(models.Model):
    user = models.ForeignKey(AppUser, on_delete=models.CASCADE)
    post = models.ForeignKey(Post, on_delete=models.CASCADE)

class Block(models.Model):
    blocked_by = models.ForeignKey(AppUser, on_delete=models.CASCADE, related_name='blocking')
    blocked_user = models.ForeignKey(AppUser, on_delete=models.CASCADE, related_name='blocked')

    def __str__(self):
        return self.caption
    
post_save.connect(Like.user_liked_post, sender=Like)
post_delete.connect(Like.user_unliked_post, sender=Like)
post_save.connect(Comment.user_comment_post, sender=Comment)
post_delete.connect(Comment.user_del_comment_post, sender=Comment)
post_save.connect(FollowerRelation.user_follow, sender=FollowerRelation)
post_delete.connect(FollowerRelation.user_unfollow, sender=FollowerRelation)