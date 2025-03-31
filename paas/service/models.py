from django.db import models

class Deployment(models.Model):
    github_repo = models.URLField()
    render_service_id = models.CharField(max_length=100, blank=True, null=True)
    service_url=models.URLField(max_length = 200)
    created_at = models.DateTimeField(auto_now_add=True)
