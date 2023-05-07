
# 環境構築

## PostgreSQLをローカルに立ち上げる

- 立ち上げは省略
- db/create.sqlを実行し、accountテーブルと初期データを作成

## packageインストール

```sh
npm i
```

## 環境変数のセット

```sh
cp .env.default .env
```

- envファイルにPostgreSQLのDB情報追加

## 実行

```sh
bash scripts/run.sh
```
