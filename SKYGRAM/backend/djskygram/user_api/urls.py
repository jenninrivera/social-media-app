from django.urls import path
from . import views
from .views import *

urlpatterns = [
	path('register', views.UserRegister.as_view(), name='register'),
	path('login', views.UserLogin.as_view(), name='login'),
	path('logout', views.UserLogout.as_view(), name='logout'),
	path('user', views.UserView.as_view(), name='user'),
    path('posts/<int:pk>', PostDetailAPIView.as_view()),
    path('feed', PostListView.as_view()),
    path('create', CreatePost.as_view()),
    path('posts', PostView.as_view()),
    path('crashpads', CrashPadPostView.as_view()),
]