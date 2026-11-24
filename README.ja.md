# CVKA

**CVKA は Nikodem Boniecki と 221 Studio によるオープンソースの履歴書作成ツールです。** 基本の履歴書を求人内容に合わせて調整し、内容を確認して PDF に出力できます。

[221 Studio](https://221studio.pl/) · [GitHub リポジトリ](https://github.com/NikodemBoniecki/cvka) · [セットアップガイド](SETUP.ja.md) · [English](README.md)

## クイックスタート

要件と詳しい手順は [SETUP.ja.md](SETUP.ja.md) をご覧ください。Docker を使う場合：

```bash
git clone https://github.com/NikodemBoniecki/cvka.git
cd cvka
docker compose up --build
```

<http://localhost:3000> を開きます。CVKA は FastAPI、Next.js、SQLite を使ってローカルで動作します。[Apache 2.0 ライセンス](LICENSE) と[帰属表示](NOTICE)をご確認ください。
