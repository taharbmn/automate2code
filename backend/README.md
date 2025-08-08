# Backend API

## Description
FastAPI backend API for the automate2code project.

## Installation

1. Create a virtual environment:
```bash
python -m venv venv
```

2. Activate the virtual environment:
```bash
# Windows
venv\Scripts\activate
# Linux/Mac
source venv/bin/activate
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

4. Configure environment variables:
Copy `.env.example` to `.env` and modify the values according to your needs.

## Launch

```bash
uvicorn app.main:app --reload
```

The API will be available at http://localhost:8000

## Documentation

- Swagger UI: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc

## Tests

```bash
pytest
```
