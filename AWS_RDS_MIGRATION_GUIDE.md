# AWS RDS MySQL Migration Guide

This guide outlines the exact code changes needed to migrate your Issue Tracking System from a local MySQL database to AWS RDS MySQL.

## Prerequisites

- AWS RDS MySQL instance created and running
- RDS instance configured as publicly accessible
- Security group configured to allow connections on port 3306
- Master username and password for the RDS instance

## Required Code Changes

### 1. Update Database Configuration (`database.py`)

**Before (Local MySQL):**
```python
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

DATABASE_URL = "mysql+pymysql://root:your_local_password@localhost:3306/your_database"
engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
```

**After (AWS RDS):**
```python
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

# AWS RDS MySQL Connection
DATABASE_URL = "mysql+pymysql://admin:YOUR_RDS_PASSWORD@YOUR_RDS_ENDPOINT:3306/YOUR_DATABASE_NAME"
engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
```

### 2. Update Environment Variables (`.env`)

**Before:**
```env
# Local MySQL Configuration
MYSQL_HOST=localhost
MYSQL_PORT=3306
MYSQL_USER=root
MYSQL_PASSWORD=your_local_password
MYSQL_DATABASE=your_database
```

**After:**
```env
# AWS RDS MySQL Configuration
MYSQL_HOST=YOUR_RDS_ENDPOINT
MYSQL_PORT=3306
MYSQL_USER=admin
MYSQL_PASSWORD=YOUR_RDS_PASSWORD
MYSQL_DATABASE=YOUR_DATABASE_NAME

# Direct DATABASE_URL for AWS RDS
DATABASE_URL=mysql+pymysql://admin:YOUR_RDS_PASSWORD@YOUR_RDS_ENDPOINT:3306/YOUR_DATABASE_NAME
```

### 3. Environment-Based Configuration (Recommended)

For better security and flexibility, modify `database.py` to use environment variables:

```python
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Build DATABASE_URL from environment variables
DATABASE_URL = (
    f"mysql+pymysql://"
    f"{os.getenv('MYSQL_USER', 'admin')}:"
    f"{os.getenv('MYSQL_PASSWORD')}@"
    f"{os.getenv('MYSQL_HOST')}:"
    f"{os.getenv('MYSQL_PORT', '3306')}/"
    f"{os.getenv('MYSQL_DATABASE', 'ticket_db')}"
)

# Alternative: Use direct DATABASE_URL if provided
DATABASE_URL = os.getenv('DATABASE_URL', DATABASE_URL)

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
```

## Migration Values

Replace the following placeholders with your actual AWS RDS values:

| Placeholder | Description | Example |
|-------------|-------------|---------|
| `YOUR_RDS_ENDPOINT` | RDS instance endpoint | `database-1.czeuumcm6cy6.ap-south-1.rds.amazonaws.com` |
| `YOUR_RDS_PASSWORD` | Master password set during RDS creation | `YourSecurePassword123` |
| `YOUR_DATABASE_NAME` | Database name to use | `ticket_db` |

**Note:** The default master username for AWS RDS MySQL is typically `admin`, not `root`.

## Common Issues and Solutions

### 1. Connection Timeout
**Error:** `Can't connect to MySQL server (timed out)`
**Solution:** Check security group allows inbound connections on port 3306 from your IP address.

### 2. Access Denied
**Error:** `Access denied for user 'root'@'your_ip'`
**Solution:** Use `admin` as the username instead of `root`, and verify the password.

### 3. Unknown Database
**Error:** `Unknown database 'your_database'`
**Solution:** Create the database on RDS first:
```sql
CREATE DATABASE your_database_name CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

### 4. Tables Not Created
If your application starts but tables don't exist, ensure your `main.py` includes:
```python
from database import Base, engine
from models import *  # Import all your models

# Create tables
Base.metadata.create_all(bind=engine)
```

## Security Best Practices

1. **Never commit passwords to version control**
   - Use `.env` files for credentials
   - Add `.env` to `.gitignore`

2. **Use environment variables in production**
   ```python
   import os
   DATABASE_URL = os.getenv('DATABASE_URL')
   ```

3. **Restrict database access**
   - Configure security groups to allow only necessary IP addresses
   - Use strong passwords
   - Consider using IAM database authentication

4. **Enable SSL/TLS (Optional)**
   ```python
   DATABASE_URL = "mysql+pymysql://admin:password@endpoint:3306/database?ssl_ca=rds-ca-2019-root.pem"
   ```

## Testing the Migration

1. Update the configuration files
2. Restart your application
3. Verify connection:
   ```python
   from database import engine
   from sqlalchemy import text
   
   with engine.connect() as conn:
       result = conn.execute(text("SELECT DATABASE(), USER()"))
       print(result.fetchone())
   ```

## Rollback Plan

To quickly rollback to local MySQL:
1. Revert `database.py` to use localhost connection
2. Revert `.env` file to local settings
3. Restart the application

Keep backup copies of your original configuration files before migration.
