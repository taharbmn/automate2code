"""
Health check endpoints
"""
from fastapi import APIRouter
from datetime import datetime
from app.config import settings

router = APIRouter()

@router.get("/")
async def health_check():
    """Basic health check endpoint"""
    return {
        "status": "healthy",
        "message": "Hello World from Health Endpoint",
        "timestamp": datetime.utcnow().isoformat(),
        "service": settings.app_name,
        "version": settings.app_version
    }

@router.get("/status")
async def detailed_status():
    """Detailed status endpoint"""
    return {
        "status": "healthy",
        "service": settings.app_name,
        "version": settings.app_version,
        "environment": settings.environment,
        "timestamp": datetime.utcnow().isoformat(),
        "uptime": "running",
        "database": "not configured",  # Since we're not using DB
        "message": "Hello World - Service is running without database"
    }

@router.get("/ping")
async def ping():
    """Simple ping endpoint"""
    return {"message": "pong"}
