#!/usr/bin/env python3
"""
Quick MySQL connectivity test for ticketwise auth service.
Run this to verify database connection before starting the full app.
"""
import os
import sys
from pathlib import Path
from dotenv import load_dotenv

# Load environment variables
project_root = Path(__file__).resolve().parent
load_dotenv(project_root / ".env")
load_dotenv(project_root / "auth" / "app" / ".env", override=False)

DATABASE_URL = os.getenv("DATABASE_URL")
print(f"Testing connection with: {DATABASE_URL}")

try:
    from sqlalchemy import create_engine, text
    
    # Test basic connection
    engine = create_engine(DATABASE_URL)
    with engine.connect() as conn:
        result = conn.execute(text("SELECT VERSION() as version, DATABASE() as current_db"))
        row = result.first()
        print(f"✅ MySQL Connection successful!")
        print(f"   Server version: {row.version}")
        print(f"   Current database: {row.current_db}")
        
        # Test if our target database exists
        result = conn.execute(text("SHOW DATABASES LIKE 'ticketwise_auth'"))
        if result.first():
            print(f"✅ Database 'ticketwise_auth' exists")
        else:
            print(f"❌ Database 'ticketwise_auth' not found")
            print("   Create it with: CREATE DATABASE ticketwise_auth;")
            sys.exit(1)
            
except Exception as e:
    print(f"❌ Connection failed: {e}")
    print("\nTroubleshooting tips:")
    print("1. Verify MySQL is running")
    print("2. Check username/password in .env file")
    print("3. Ensure database 'ticketwise_auth' exists")
    print("4. Special characters in password need URL encoding (@ becomes %40)")
    sys.exit(1)

print(f"\n🚀 Ready to run: uvicorn auth.app.main:app --reload")
