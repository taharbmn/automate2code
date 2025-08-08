"""
Main entry point for the FastAPI application
"""
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import health, api_v1
from app.config import settings

# Create FastAPI application
app = FastAPI(
    title="Automate2Code API",
    description="A FastAPI application for automation and code generation",
    version="1.0.0"
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Configure this properly for production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(health.router, prefix="/health", tags=["health"])
app.include_router(api_v1.router, prefix="/api/v1", tags=["api"])

@app.get("/")
async def root():
    """Root endpoint that returns Hello World"""
    return {"message": "Hello World"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
