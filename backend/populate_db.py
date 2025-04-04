import sqlite3
import os
import shutil
from pathlib import Path

# Criar diretório para imagens se não existir
os.makedirs("images", exist_ok=True)

# Conectar ao banco de dados
conn = sqlite3.connect('petfinder.db')
cursor = conn.cursor()

# Criar tabelas se não existirem
cursor.execute('''
CREATE TABLE IF NOT EXISTS registered_pets (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    location TEXT NOT NULL,
    is_lost BOOLEAN DEFAULT 0,
    photo_path TEXT NOT NULL
)
''')

cursor.execute('''
CREATE TABLE IF NOT EXISTS lost_pets (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    location TEXT NOT NULL,
    photo_path TEXT NOT NULL
)
''')

# Função para copiar imagens de exemplo
def copy_sample_image(source_dir, image_name):
    # Criar diretório de imagens de exemplo se não existir
    sample_dir = Path(source_dir)
    sample_dir.mkdir(exist_ok=True)
    
    # Caminho da imagem de exemplo
    image_path = sample_dir / image_name
    
    # Criar uma imagem de exemplo vazia se não existir
    if not image_path.exists():
        with open(image_path, 'wb') as f:
            f.write(b'Sample image data')
    
    # Copiar para o diretório de imagens
    dest_path = f"images/{image_name}"
    shutil.copy(image_path, dest_path)
    
    return dest_path

# Criar diretório para imagens de exemplo
sample_images_dir = "sample_images"
os.makedirs(sample_images_dir, exist_ok=True)

# Dados de exemplo para pets registrados
registered_pets = [
    {
        "name": "Rex",
        "location": "São Paulo",
        "is_lost": False,
        "image": "dog1.jpg"
    },
    {
        "name": "Thor",
        "location": "Rio de Janeiro",
        "is_lost": True,
        "image": "dog2.jpg"
    }
]

# Dados de exemplo para pets perdidos
lost_pets = [
    {"location": "São Paulo", "image": "cat1.jpg"},
    {"location": "Rio de Janeiro", "image": "dog3.jpg"},
    {"location": "Belo Horizonte", "image": "dog4.jpg"},
    {"location": "Salvador", "image": "cat2.jpg"},
    {"location": "Brasília", "image": "dog5.jpg"},
    {"location": "Curitiba", "image": "dog6.jpg"},
    {"location": "Fortaleza", "image": "dog7.jpg"}
]

# Inserir dados de exemplo para pets registrados
for pet in registered_pets:
    photo_path = copy_sample_image(sample_images_dir, pet["image"])
    cursor.execute(
        "INSERT INTO registered_pets (name, location, is_lost, photo_path) VALUES (?, ?, ?, ?)",
        (pet["name"], pet["location"], pet["is_lost"], photo_path)
    )

# Inserir dados de exemplo para pets perdidos
for pet in lost_pets:
    photo_path = copy_sample_image(sample_images_dir, pet["image"])
    cursor.execute(
        "INSERT INTO lost_pets (location, photo_path) VALUES (?, ?)",
        (pet["location"], photo_path)
    )

# Confirmar as alterações e fechar a conexão
conn.commit()
conn.close()

print("Banco de dados populado com sucesso!")
