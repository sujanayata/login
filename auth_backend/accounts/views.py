import json
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.hashers import make_password, check_password
from .models import User_info


@csrf_exempt
def signup(request):
    if request.method == "POST":
        data = json.loads(request.body)

        username = data.get("username")
        email = data.get("email")
        password = data.get("password")

        # Check existing user
        if User_info.objects.filter(email=email).exists():
            return JsonResponse({"error": "Email already exists"}, status=400)

        if User_info.objects.filter(username=username).exists():
            return JsonResponse({"error": "Username already exists"}, status=400)

        User_info.objects.create(
            username=username,
            email=email,
            password=make_password(password)  # 🔐 hashed
        )

        return JsonResponse({"message": "Signup successful"}, status=201)

    return JsonResponse({"error": "Method not allowed"}, status=405)


@csrf_exempt
def login(request):
    if request.method == "POST":
        data = json.loads(request.body)

        email = data.get("email")
        password = data.get("password")

        try:
            user = User_info.objects.get(email=email)

            if check_password(password, user.password):
                return JsonResponse({
                    "message": "Login successful",
                    "username": user.username,
                    "email": user.email
                })
            else:
                return JsonResponse({"error": "Invalid credentials"}, status=400)

        except User_info.DoesNotExist:
            return JsonResponse({"error": "Invalid credentials"}, status=400)
