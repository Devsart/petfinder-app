from fastapi import FastAPI, UploadFile, File, Form, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from sqlalchemy import create_engine, Column, Integer, String, Boolean
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from typing import List, Optional
import os
import shutil
from pydantic import BaseModel
import uuid

# Criar diretório para armazenar imagens
os.makedirs("images", exist_ok=True)

# Configuração do banco de dados
SQLALCHEMY_DATABASE_URL = "sqlite:///./petfinder.db"
engine = create_engine(SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False})
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

# Modelos SQLAlchemy
class RegisteredPet(Base):
    __tablename__ = "registered_pets"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    location = Column(String)
    is_lost = Column(Boolean, default=False)
    photo_path = Column(String)

class LostPet(Base):
    __tablename__ = "lost_pets"
    
    id = Column(Integer, primary_key=True, index=True)
    location = Column(String)
    photo_path = Column(String)

# Criar tabelas
Base.metadata.create_all(bind=engine)

# Modelos Pydantic
class RegisteredPetBase(BaseModel):
    name: str
    location: str
    is_lost: bool = False
    photo_path: str

class RegisteredPetCreate(BaseModel):
    name: str
    location: str
    is_lost: bool = False

class RegisteredPetResponse(RegisteredPetBase):
    id: int
    
    class Config:
        orm_mode = True

class LostPetBase(BaseModel):
    location: str
    photo_path: str

class LostPetCreate(BaseModel):
    location: str

class LostPetResponse(LostPetBase):
    id: int
    
    class Config:
        orm_mode = True

# Aplicação FastAPI
app = FastAPI(title="PetFinder Brasil API")

# Configurar CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Montar diretório de imagens
app.mount("/images", StaticFiles(directory="images"), name="images")

# Função para obter sessão do banco de dados
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Rotas para pets registrados
@app.post("/api/registered-pets/", response_model=RegisteredPetResponse)
async def create_registered_pet(
    name: str = Form(...),
    location: str = Form(...),
    is_lost: bool = Form(False),
    photo: UploadFile = File(...)
):
    # Salvar a imagem
    file_extension = os.path.splitext(photo.filename)[1]
    filename = f"{uuid.uuid4()}{file_extension}"
    file_path = f"images/{filename}"
    
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(photo.file, buffer)
    
    # Criar o pet no banco de dados
    db = SessionLocal()
    db_pet = RegisteredPet(name=name, location=location, is_lost=is_lost, photo_path=file_path)
    db.add(db_pet)
    db.commit()
    db.refresh(db_pet)
    db.close()
    
    return db_pet

@app.get("/api/registered-pets/", response_model=List[RegisteredPetResponse])
async def read_registered_pets():
    db = SessionLocal()
    pets = db.query(RegisteredPet).all()
    db.close()
    return pets

@app.get("/api/registered-pets/{pet_id}", response_model=RegisteredPetResponse)
async def read_registered_pet(pet_id: int):
    db = SessionLocal()
    pet = db.query(RegisteredPet).filter(RegisteredPet.id == pet_id).first()
    db.close()
    if pet is None:
        raise HTTPException(status_code=404, detail="Pet não encontrado")
    return pet

@app.put("/api/registered-pets/{pet_id}/lost-status", response_model=RegisteredPetResponse)
async def update_pet_lost_status(pet_id: int, is_lost: bool = Form(...)):
    db = SessionLocal()
    pet = db.query(RegisteredPet).filter(RegisteredPet.id == pet_id).first()
    if pet is None:
        db.close()
        raise HTTPException(status_code=404, detail="Pet não encontrado")
    
    pet.is_lost = is_lost
    db.commit()
    db.refresh(pet)
    db.close()
    return pet

# Rotas para pets perdidos
@app.post("/api/lost-pets/", response_model=LostPetResponse)
async def create_lost_pet(
    location: str = Form(...),
    photo: UploadFile = File(...)
):
    # Salvar a imagem
    file_extension = os.path.splitext(photo.filename)[1]
    filename = f"{uuid.uuid4()}{file_extension}"
    file_path = f"images/{filename}"
    
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(photo.file, buffer)
    
    # Criar o pet perdido no banco de dados
    db = SessionLocal()
    db_pet = LostPet(location=location, photo_path=file_path)
    db.add(db_pet)
    db.commit()
    db.refresh(db_pet)
    db.close()
    
    return db_pet

@app.get("/api/lost-pets/", response_model=List[LostPetResponse])
async def read_lost_pets():
    db = SessionLocal()
    pets = db.query(LostPet).all()
    db.close()
    return pets

@app.get("/api/lost-pets/{pet_id}", response_model=LostPetResponse)
async def read_lost_pet(pet_id: int):
    db = SessionLocal()
    pet = db.query(LostPet).filter(LostPet.id == pet_id).first()
    db.close()
    if pet is None:
        raise HTTPException(status_code=404, detail="Pet perdido não encontrado")
    return pet

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
