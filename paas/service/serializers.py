from rest_framework.serializers import ModelSerializer
from rest_framework import serializers
from . import models

class DeploymentSerializer(ModelSerializer):
    class Meta:
        model = models.Deployment
        fields = '__all__'
        read_only_fields = ['created_at']