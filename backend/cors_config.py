# Configuração CORS para permitir requisições do frontend
from fastapi.middleware.cors import CORSMiddleware

# Adicionar estas linhas após a criação da aplicação FastAPI
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Em produção, especifique a origem exata
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
