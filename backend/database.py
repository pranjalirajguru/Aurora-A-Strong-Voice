# database.py
import oracledb

# Enable Thick mode using your Instant Client
oracledb.init_oracle_client(lib_dir=r"C:\oracle\instantclient_19_28")

from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

# Replace with your actual Oracle username/password
ORACLE_USERNAME = "system"
ORACLE_PASSWORD = "password"
ORACLE_DSN = "localhost:1521/XE"  # Change if your SID/service name differs

DATABASE_URL = f"oracle+oracledb://{ORACLE_USERNAME}:{ORACLE_PASSWORD}@{ORACLE_DSN}"


engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
