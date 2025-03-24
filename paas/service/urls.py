from django.urls import path,include
from . import views
urlpatterns = [
    path('',views.DeployApp.as_view(),name='deploy-app'),
]
