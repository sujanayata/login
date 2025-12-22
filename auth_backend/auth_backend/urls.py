from django.contrib import admin
from django.urls import path, include
from django.http import HttpResponse

def home(request):
    return HttpResponse("App is running")

urlpatterns = [
    path("", home),                     # ← ADD THIS (root URL)
    path("api/", include("accounts.urls")),
    path("admin/", admin.site.urls),
]
