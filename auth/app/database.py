from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, DeclarativeBase
import os
from pathlib import Path
from dotenv import load_dotenv

# Load .env from current working directory (project root) and also this module's directory.
load_dotenv()  # root
app_env = Path(__file__).resolve().parent / ".env"
if app_env.exists():
    load_dotenv(app_env, override=False)

DATABASE_URL = os.getenv("DATABASE_URL", "mysql+pymysql://root:password@localhost:3306/ticketwise_auth")

engine = create_engine(DATABASE_URL, echo=False, future=True)
SessionLocal = sessionmaker(bind=engine, autocommit=False, autoflush=False, future=True)

class Base(DeclarativeBase):
    pass

# Dependency
def get_db():
    session = SessionLocal()
    try:
        yield session
    finally:
        session.close()

from contextlib import contextmanager

@contextmanager
def get_session():
    session = SessionLocal()
    try:
        yield session
        session.commit()
    except Exception:
        session.rollback()
        raise
    finally:
        session.close()
