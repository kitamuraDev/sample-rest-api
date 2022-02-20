# Express x TypeScript starterkit

このリポジトリは、Express と TypeScript のアプリ開発（バックエンド API 開発）のスターターキットを提供するリポジトリです。以下の技術で構成されています。

- Express
- TypeScript
- ts-node-dev
- ESLint（Airbnb(airbnb-base)）
- Prettier

## ■ 目次

1. 主要ソフトのバージョン
2. 環境構築手順（備忘録）
3. アプリの起動方法
4. よく使うコマンドリスト

<br />

## ■ 主要ソフトのバージョン

- Node.js（16.10.0）
- npm（7.24.0）
- yarn（1.22.5）
- Express（4.17.2）
- TypeScript（4.5.5）
- ts-node-dev（1.1.8）
- ESLint（@8.9.0）
- Prettier（@2.5.1）

<br />

## ■ 環境構築手順（備忘録）

> 環境構築のベース（基本的な進め方）はこちらの[記事](https://snowsystem.net/javascript/typescript/express-typescript-rest-api/)を参照

1. `npm init -y`
2. パッケージインストール
   - 型定義ファイル（@types）を直接タイプするのが面倒な方は後述する`npx typesync`で一括インストールすることも可能
   - eslint 関係のパッケージは`yarn create @eslint/config`後にインストールする

```
$ yarn add express
$ yarn add --dev eslint typescript ts-node-dev prettier rimraf npm-run-all @types/eslint @types/express @types/node @types/prettier @types/rimraf
```

3. `yarn create @eslint/config`（eslint の設定ファイル生成）
   - How would you like to use ESLint? -> <b>To check syntax, find problems, and enforce code style</b>
   - What type of modules does your project use? -> <b>JavaScript Modules（Import / export）</b>
   - Which framework does your project use? -> <b>None of these</b>
   - Does your project use TypeScript? -> <b>Yes</b>
   - Where does your code run? -> <b>Node</b>
   - How would you like to define a style for your project? -> <b>Use a popular style guide</b>
   - Which style guide do you want to follow? -> <b>Airbnb</b>
   - What format do you want your config file to be in? -> <b>JSON</b>
   - Would you like to install them now with npm? -> <b>No</b>
4. eslint 関係のパッケージインストール

```
$ yarn add --dev @typescript-eslint/eslint-plugin @typescript-eslint/parser eslint-config-airbnb-base eslint-config-prettier eslint-plugin-import eslint-plugin-simple-import-sort
```

5. 以下の設定ファイルをカスタマイズ（当プロジェクトのコピーで大丈夫）
   - `.eslintignore`
   - `.eslintrc.json`
   - `.gitignore`
   - `.prettierrc`
   - `package.json(scripts)`
   - `tsconfig.eslint.json`
   - `tsconfig.json`
6. `yarn`（一応インストール漏れがないよう、確認の意味も込めて）
7. ESLint と Prettier のルールがコンフリクトしていないか調べる

```
$ yarn lint:conflict
```

<br />

## ■ アプリの起動方法

1. $ `git clone https://github.com/kitamuraDev/express-typescript-starterkit.git`
2. $ `cd express-typescript-starterkit`
3. $ `yarn`
4. $ `yarn dev`
5. $ （JS にトランスパイルしてアプリを起動する場合は）`yarn tsc && yarn start`

<br />

# Tip's

## ■ よく使うコマンドリスト

- $ `yarn list <パッケージ名>` // インストール済みのパッケージの情報を確認
- $ `yarn upgrade-interactive --latest` // インタラクティブにアップグレードするパッケージを選択
- $ `npx typesync` // package.json をチェックして、不足している TypeScript の型定義ファイルを追加
