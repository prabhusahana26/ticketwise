from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

# Update with your AWS RDS MySQL credentials


#this the the new url 
DATABASE_URL = "mysql+pymysql://admin:Vinaychand@database-1.czeuumcm6cy6.ap-south-1.rds.amazonaws.com:3306/ticket_db"
engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()
#print the url 
# Dependency for FastAPI
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()