from django.db import models

class Deployment(models.Model):
    github_repo = models.URLField()
    render_service_id = models.CharField(max_length=100, blank=True, null=True)
    status = models.CharField(max_length=50, default="Pending")
    created_at = models.DateTimeField(auto_now_add=True)
