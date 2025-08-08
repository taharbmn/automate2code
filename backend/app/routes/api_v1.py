"""
Main API v1 router
"""
from fastapi import APIRouter
from app.config import settings

router = APIRouter()

@router.get("/")
async def api_root():
    """API v1 root endpoint"""
    return {
        "message": "Hello World from API v1",
        "version": "1.0.0",
        "service": settings.app_name,
        "endpoints": {
            "health": "/health",
            "ping": "/health/ping",
            "status": "/health/status",
            "settings": "/api/v1/settings"
        }
    }

@router.get("/hello")
async def hello_world():
    """Simple Hello World endpoint"""
    return {
        "message": "Hello World",
        "greeting": "Welcome to Automate2Code API",
        "status": "success"
    }

@router.get("/settings")
async def get_settings():
    """Get application settings (non-sensitive)"""
    return {
        "app_name": settings.app_name,
        "app_version": settings.app_version,
        "environment": settings.environment,
        "api_prefix": settings.api_v1_prefix,
        "message": "Hello World - These are the current settings"
    }
