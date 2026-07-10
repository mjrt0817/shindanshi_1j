# 中小企業診断士1次アプリ Vercel公開版（同期診断機能付き）

## ファイル構成

GitHubリポジトリの直下に以下を置いてください。

```text
/
├─ index.html
├─ firebase.rules
├─ vercel.json
└─ README_Vercel公開手順.md
```

## Vercel設定

- Framework Preset: Other
- Build Command: 空欄
- Output Directory: 空欄
- Root Directory: リポジトリ直下

## Firebase側で必要な設定

1. Authentication → Sign-in method → Google を有効化
2. Authentication → Settings → Authorized domains にVercelの本番ドメインを追加
   - 例: `xxxxx.vercel.app`
3. Firestore Database を作成
4. `firebase.rules` の内容を Firestore Rules に貼り付けて公開

## 追加した診断機能

- 同期ステータスの詳細表示
  - Firebase設定
  - Firebase SDK読込
  - Googleログイン状態
  - Firestore初期化
  - 最終保存
  - 最終読込
  - 接続テスト結果
  - 端末ID
- エラー詳細表示
  - エラーコード
  - エラーメッセージ
  - よくある原因
- 接続テストボタン
  - Googleログイン確認
  - Firestoreへの書き込み
  - Firestoreからの読み込み
  - ログインユーザーIDとの一致確認
- 同期ログ表示
  - 保存予約中
  - 自動保存中
  - 保存成功
  - 読込成功
  - 接続テスト成功/失敗

## 確認手順

1. Vercelにデプロイ
2. Firebaseの承認済みドメインにVercelのドメインを追加
3. アプリを開く
4. 「同期・データ管理」を開く
5. Googleアカウントでログイン
6. 「接続テスト」を押す
7. 「接続テスト成功：Googleログイン・Firestore読込/書込OK」と表示されれば同期設定は完了です。

## よくあるエラー

### auth/unauthorized-domain
Firebase Authentication の Authorized domains に Vercel のドメインが入っていません。

### Missing or insufficient permissions
Firestore Rules が未反映、または Firestore Database が未作成の可能性があります。

### Firebase SDKを読み込めませんでした
ネットワーク、広告ブロック、ブラウザ制限、CSP設定などで Firebase SDK が読み込めていません。

### Googleアカウントにログインしていません
先に「Googleアカウントでログイン」を押してください。
