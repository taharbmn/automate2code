"""
Application configuration
"""
import os
from pydantic_settings import BaseSettings
from pydantic import ConfigDict
from typing import Optional

class Settings(BaseSettings):
    """Application settings"""

    model_config = ConfigDict(
        env_file=".env",
        case_sensitive=False,
        extra="ignore"  # Ignore extra environment variables
    )

    # Application settings
    app_name: str = "Automate2Code API"
    app_version: str = "1.0.0"
    debug: bool = False

    # Server settings
    host: str = "0.0.0.0"
    port: int = 8000

    # Environment
    environment: str = "development"

    # API settings
    api_v1_prefix: str = "/api/v1"

    # Security settings (for future use)
    secret_key: Optional[str] = None
    access_token_expire_minutes: int = 30

# Create settings instance
settings = Settings()
