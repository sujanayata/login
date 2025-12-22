import json
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import User

@csrf_exempt
def signup(request):
    if request.method == "POST":
        data = json.loads(request.body)

        User.objects.create(
            username=data["username"],
            email=data["email"],
            password=data["password"]
        )

        return JsonResponse({"message": "User created"}, status=201)

    return JsonResponse({"error": "Method not allowed"}, status=405)


@csrf_exempt
def login(request):
    if request.method == "POST":
        data = json.loads(request.body)
        try:
            user = User.objects.get(
                email=data["email"],
                password=data["password"]
            )
            return JsonResponse({"message": "Login success"})
        except:
            return JsonResponse({"message": "Invalid credentials"}, status=400)
