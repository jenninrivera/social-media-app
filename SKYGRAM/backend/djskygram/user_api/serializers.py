from rest_framework import serializers
from django.contrib.auth import get_user_model, authenticate
from .models import Post, CrashPadPost

UserModel = get_user_model()

class UserRegisterSerializer(serializers.ModelSerializer):
	class Meta:
		model = UserModel
		fields = '__all__'
	def create(self, clean_data):
		user_obj = UserModel.objects.create_user(email=clean_data['email'], password=clean_data['password'])
		user_obj.username = clean_data['username']
		user_obj.save()
		return user_obj

class UserLoginSerializer(serializers.Serializer):
	email = serializers.EmailField()
	password = serializers.CharField()
	##
	def check_user(self, clean_data):
		user = authenticate(username=clean_data['email'], password=clean_data['password'])
		if not user:
			raise ValueError('user not found')
		return user

class UserSerializer(serializers.ModelSerializer):
	class Meta:
		model = UserModel
		fields = ('username', 'email')
            

class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = ('__all__')

class CreatePostSerializer(serializers.ModelSerializer):
    author_id = serializers.IntegerField(write_only=True)
    class Meta:
        model = Post
        fields = ('caption', 'image', 'created_at', 'author_id')

class CrashPadPostSerializer(serializers.ModelSerializer):
    class Meta:
        model = CrashPadPost
        fields = ('__all__')

class CreateCrashPadPostSerializer(serializers.ModelSerializer):
    author_id = serializers.IntegerField(write_only=True)

    class Meta:
        model = CrashPadPost
        fields = ('author', 'text')