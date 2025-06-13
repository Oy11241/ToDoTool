# TodoApp

React + TypeScript + Vite を用いたタスク管理アプリです。  
シンプルで使いやすい UI を目指し、日々のタスクを効率的に管理できるよう設計されています。
React と typeScript の勉強のために作成しました。

## 🔧 使用技術

- **React**
- **TypeScript**
- **Vite**
- **その他必要なライブラリ**

## 📸 画面一覧

### ✅ Todo 管理画面

- タスクの追加、削除、編集が可能（※登録したタスクはローカルストレージに保存される）
- タスクには完了状態、期限、優先度の設定が可能
- ステータス別のフィルタリングを用意
- ごみ箱から不要なタスクの削除

### 📊 ダッシュボード画面

- 総タスク数・完了・未完了の統計表示
- 優先度別のタスク可視化
- 期限切れタスクのアラート
- 本日が期限の未完了タスクのアラート

### 📅 カレンダー画面

- 日付ごとのタスク表示
- カレンダー形式で視覚的にタスクを確認
- 完了したタスクは打ち消し線で表示

## 🚀 起動方法

### 1. リポジトリをクローン

```bash
git clone https://github.com/Oy11241/ToDoTool.git
cd vite-project
```

### 2. 依存関係をインストール

```bash
npm install
```

### 3. 開発サーバーを起動

```bash
npm run dev
```

## 📁 ディレクトリ構成

```bash
src/
│ App.tsx # ルーティングとレイアウトのエントリポイント
│ index.css # 全体スタイル
│ main.tsx # アプリのエントリポイント
│ vite-env.d.ts # Viteの型補完用定義
│
├─components # UIコンポーネント群
│ ├─calendar # カレンダー画面用コンポーネント
│ │ CalendarTodoList.tsx
│ │
│ ├─common # 共通UI（ヘッダーやナビゲーションなど）
│ │ Header.tsx
│ │ Layout.tsx
│ │ Navigation.tsx
│ │
│ ├─dashboard # ダッシュボード画面用コンポーネント
│ │ DashboardAlert.tsx
│ │ DashboardBar.tsx
│ │ DashboardGrid.tsx
│ │
│ └─todo # Todo管理画面用コンポーネント
│ TodoFilter.tsx
│ TodoForm.tsx
│ TodoItem.tsx
│ TodoList.tsx
│
├─constants # 定数をまとめたファイル群
│ index.ts
│
├─hooks # カスタムフック
│ useTodos.ts # Todo操作に関するロジックをカスタムフックとして抽出
│
├─lib # 汎用ライブラリ関数
│ isTodos.ts # Todo配列の型チェック用関数
│
├─pages # 各ページコンポーネント
│ CalendarPage.tsx
│ DashboardPage.tsx
│ TodoPage.tsx
│
└─types # 型定義ファイル
　 index.ts
```

## 💡 今後の予定

- より使いやすい画面になるよう、既存画面への機能追加・UI 修正
- バックエンドに DB を導入し、サーバサイドを意識した実装
- テスト導入（Jest + React Testing Library）
- レスポンシブ対応・モバイル UI 最適化（Tailwind CSS）
