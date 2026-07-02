# 🤖 Ejemplo 06 — IA local con Docker Model Runner (`ai/smollm2`)

Interactúa con tu **propio modelo de IA local** de forma ultrasencilla utilizando la API local oficial de **Docker Model Runner** (introducida en 2026).

En lugar de levantar complejos contenedores externos de terceros como Ollama, Docker Model Runner te permite descargar modelos de lenguaje directamente de Docker Hub o Hugging Face y correrlos optimizadamente en la GPU de tu hardware (Metal/CUDA).

## ✅ Qué necesitas
- **Docker Desktop** (versión de 2026 en adelante) con la CLI de `docker model` integrada de manera nativa.

## 🚀 Puesta en marcha

### 1. Descarga el modelo en el Host
Antes de arrancar el contenedor de la aplicación, arrastraremos el modelo `ai/smollm2` (~256 MB) de forma local en tu ordenador:

```bash
# Descargar el modelo ligero de Docker Hub
docker model pull ai/smollm2
```

### 2. Levantar la aplicación con Docker Compose
Este microservicio en Flask se conecta a la API de tu máquina local:

```bash
# Levantar el contenedor
docker compose up -d --build
```

### 3. Prueba la API local
Tu aplicación ahora está exponiendo un puerto en el host `5002` mapeado al puerto `5000` interno del contenedor, el cual redirige las consultas a `http://model-runner.docker.internal/v1/`.

```bash
# Realizar una consulta de prueba
curl "http://localhost:5002/ask?q=What+is+a+container+in+one+sentence"
```

Verás una respuesta en formato JSON con la respuesta procesada de forma offline por el modelo local.

### 4. Limpieza
```bash
docker compose down
```
