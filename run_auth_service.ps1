# Activate virtual environment
Write-Host "Activating virtual environment..." -ForegroundColor Green
& .\.venv\Scripts\Activate.ps1

# Install/update dependencies
Write-Host "Installing/updating dependencies..." -ForegroundColor Green
pip install -r auth\requirements.txt

# Start FastAPI server
Write-Host "Starting FastAPI server..." -ForegroundColor Green
uvicorn auth.app.main:app --reload --host 127.0.0.1 --port 8000
