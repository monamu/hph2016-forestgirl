# フロントを開発するためのテンプレートプロジェクト

# 使っているもの

* webpack
* babel
* react
* material-ui
* eslint
* airbnb styleguide
* Axios

このプロジェクトのベースはMaterial-UIのExample Webpack Project（http://callemall.github.io/material-ui/）です。
上記プロジェクトに対して、airbnb styleguide axiosを適用しています。

ちなみに、axiosだけはhttpクライアントなのでほかとは少々毛色が違います。

# プロジェクトの開始

プロジェクトに必要なものはpackage.jsonに定義しています。

```sh
npm install
```

これで準備が完了です。

# 開発用ローカルサーバの起動

```sh
npm start
```

`3000`ポートでhttpサーバが起動します。ソースを変更すると自動的にページがリロードされます。

# 構文チェック

## コマンドラインで行う場合

```sh
npm run lint
```

## Atomで行う場合

Packageのlinter,linter-eslint をインストールすると、問題点をエディター上で指摘されます。

# リリースビルド

```sh
npm run build
```

/buildディレクトリ配下にファイルが置かれます。
