# daredemo-manga

画力がないクリエイターでも、アイデアさえあれば漫画制作の全工程をストレスなく完結できるサービス。holonica-studio(`/home/ichiro16go/dev/holonica/Holonica-studio`)を仕様面で参考にした**独立クローンサービス**であり、データ基盤・アカウントは holonica-studio と完全に分離している。

holonicaに対する差別化点は、PC版のフル漫画エディタに加えてスマホ版アプリ(機能制限版: 読む+キャラクター生成)を提供し、スマホユーザー層を獲得すること。

## ステータス

要件定義・開発計画・GitHub Issue起票(#1〜#27)まで完了。実装はまだ着手していない(次の作業: Issue #2 のSupabaseスキーマ設計)。

## ドキュメント

- [`docs/要件定義書.md`](./docs/要件定義書.md) — 目的・ゴール・スコープ・意思決定ログ
- [`docs/開発計画.md`](./docs/開発計画.md) — issue-driven開発計画、GitHub Issue番号対応表

## 技術スタック(暫定・Issue #1で確定)

holonica-studioと同カテゴリを仮置き。コードは流用せずスクラッチ実装。

- フレームワーク: Next.js + React + TypeScript
- スタイリング: Tailwind CSS + shadcn/ui
- キャンバス: Fabric.js
- バックエンド: Supabase(holonicaとは別プロジェクト)
- AI: Gemini / ARK API

## 開発の進め方

PM(自分)1人 + 複数のClaude Codeエージェントを並行稼働させる、issue-driven開発。GitHub IssueをWave(依存関係で束ねた並列実行単位)に分解して管理している。詳細は [`docs/開発計画.md`](./docs/開発計画.md) を参照。
