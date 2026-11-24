# CVKA

**CVKA 是 Nikodem Boniecki 与 221 Studio 开发的开源简历工具。** 根据职位描述定制简历，检查修改内容并导出 PDF。

[221 Studio](https://221studio.pl/) · [GitHub 仓库](https://github.com/NikodemBoniecki/cvka) · [安装指南](SETUP.zh-CN.md) · [English](README.md)

## 快速开始

完整要求和步骤请参阅 [SETUP.zh-CN.md](SETUP.zh-CN.md)。使用 Docker：

```bash
git clone https://github.com/NikodemBoniecki/cvka.git
cd cvka
docker compose up --build
```

在浏览器打开 <http://localhost:3000>。CVKA 使用 FastAPI、Next.js 和 SQLite 在本地运行。请参阅 [Apache 2.0 许可证](LICENSE) 和[归属声明](NOTICE)。
