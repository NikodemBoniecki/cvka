# CVKA

**CVKA es un creador de CV de código abierto de Nikodem Boniecki y 221 Studio.** Adapta un CV maestro a cada oferta, revisa los cambios y exporta un PDF.

[221 Studio](https://221studio.pl/) · [Repositorio de GitHub](https://github.com/NikodemBoniecki/cvka) · [Guía de instalación](SETUP.es.md) · [English](README.md)

## Inicio rápido

Consulta [SETUP.es.md](SETUP.es.md) para ver los requisitos y las instrucciones completas. Con Docker:

```bash
git clone https://github.com/NikodemBoniecki/cvka.git
cd cvka
docker compose up --build
```

Abre <http://localhost:3000>. CVKA se ejecuta localmente con una API FastAPI, una interfaz Next.js y una base de datos SQLite. Consulta [la licencia Apache 2.0](LICENSE) y [los avisos de atribución](NOTICE).
