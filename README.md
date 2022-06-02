# react-template

Reactによるプロジェクト雛形

- SPAベースのReact開発環境を提供します。

## クイックスタート

以下のコマンドで開始できます。

```sh
npm install
npm run start
```

ローカルで実行できます

[http://localhost:8080](http://localhost:8080)

## 開発

- typescriptを想定しています。
- ビルド時にESLintを用いて静的解析をおこないます。
  - 併せて、Prettierによる自動整形もおこないます。
- importパスはエイリアスを設定してあります。
  - `src/*` ディレクトリ下は `@/*` で絶対パス表記できます。
- CSSを取り込めるよう、loaderを追加しました。

コマンド | 内容
---- | ----
`npm run lint` | 静的解析をおこないます
`npm run prettier` | 自動整形をおこないます
`npm run format` | 静的解析の実施（fixオプション付き）と自動整形をおこないます

## ビルド

distディレクトリ下にビルドされます。

```sh
npm run build
```

- `src/js/index.tsx` を元にbundleファイルを生成します。
  - ファイル名にはコミットIDを含めて生成します。（ブラウザキャッシュ除去のため）
- `src/index.html` を元にhtmlファイルを生成します。
  - ビルド時間とコミットハッシュをコメントします。
  - ビルド環境に併せてタイトルを変更できます。
- `src/htdocs` ディレクトリの中身は `dist` 下にコピーされます。
  - 静的ファイルの管理に利用してください。
