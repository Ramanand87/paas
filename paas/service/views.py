import requests
from django.conf import settings
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Deployment
import os
from . import models
import load_dotenv
load_dotenv.load_dotenv()
import datetime
import requests
from django.conf import settings

url = "https://api.render.com/v1/owners"

RENDER_API_KEY = os.getenv("RENDER_API_KEY")  
HEADERS = {
    "Authorization": f"Bearer {RENDER_API_KEY}",
    "Content-Type": "application/json",
}

RENDER_API_URL = "https://api.render.com/v1/services"

class DeployApp(APIView):
    def get(self,request):
        try:
            deployment=models.Deployment.objects.all()
            return Response({"All Deployments":deployment}, status=200)
        except Exception as e:
            return Response({"error": str(e)}, status=500)
    def post(self, request):
        try:
            data = request.data
            github_repo = data.get("github_repo")

            if not github_repo:
                return Response({"error": "GitHub repo URL is required"}, status=400)

            payload = {
                "ownerId": "tea-csp64sbtq21c73eajjv0",
                "name": data.get("name"),
                "repo": github_repo,
                "branch": data.get("branch"),  
                "type": "static_site",
                "publishDir": data.get("publishDir"), 
                "buildCommand": "",  
                "envVars": []
            }

            response = requests.post(RENDER_API_URL, json=payload, headers=HEADERS)

            if response.status_code == 201:
                response_data = response.json()
                service_id = response_data.get("service", {}).get("id")  
                deployment_url = response_data.get("service", {}).get("serviceDetails", {}).get("url")
                Deployment.objects.create(github_repo=github_repo, render_service_id=service_id, status="Deploying",created_at=datetime.datetime.now())
                return Response({"message": "Deployment started", "service_id": service_id, "deployment_url": deployment_url}, status=201)
            
            return Response(response.json(), status=response.status_code)
        except Exception as e:
            return Response({"error": str(e)}, status=500)
