from django.db import models

class Deployment(models.Model):
    name = models.CharField(max_length=100, blank=True, null=True)
    github_repo = models.URLField()
    publishDir = models.CharField(max_length=100, blank=True, null=True)
    branch = models.CharField(max_length=100, blank=True, null=True)
    render_service_id = models.CharField(max_length=100, blank=True, null=True)
    service_url=models.URLField(max_length = 200, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    def __str__(self):
        return self.name