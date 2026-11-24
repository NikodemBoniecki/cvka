# CVKA

**CVKA é um editor de currículos de código aberto de Nikodem Boniecki e 221 Studio.** Adapte um currículo principal para cada vaga, revise as alterações e exporte um PDF.

[221 Studio](https://221studio.pl/) · [Repositório no GitHub](https://github.com/NikodemBoniecki/cvka) · [Guia de instalação](SETUP.pt-BR.md) · [English](README.md)

## Início rápido

Consulte [SETUP.pt-BR.md](SETUP.pt-BR.md) para ver os requisitos e as instruções completas. Com Docker:

```bash
git clone https://github.com/NikodemBoniecki/cvka.git
cd cvka
docker compose up --build
```

Acesse <http://localhost:3000>. O CVKA roda localmente com uma API FastAPI, interface Next.js e banco SQLite. Consulte a [licença Apache 2.0](LICENSE) e os [avisos de atribuição](NOTICE).
