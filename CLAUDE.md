# daredemo-manga Project Rules

## プロダクトの前提(必読)

- daredemo-mangaは `holonica-studio` (`/home/ichiro16go/dev/holonica/Holonica-studio`) の仕様を参考にした**独立クローンサービス**。コード・データ基盤・アカウントはholonicaと一切共有しない
- PC版(フル漫画エディタ)とスマホ版(PWA、読む機能+キャラクター生成機能に限定)の2クライアントで構成される、単一サービス(同一アカウント・DB)
- 詳細な意思決定の経緯は [`docs/要件定義書.md`](./docs/要件定義書.md) の「0.1 検討の経緯(意思決定ログ)」に記録されている。仕様判断に迷ったら、実装や過去の会話から推測する前に必ずここを確認する
- 開発計画・GitHub Issueの対応表は [`docs/開発計画.md`](./docs/開発計画.md) を参照

## 開発の進め方: issue-driven + 並行エージェント

- 体制: PM(ユーザー本人)1人 + 複数のClaude Codeエージェントを並行稼働
- GitHub Issue(#1〜#27、Wave 0〜7)を依存関係で束ね、依存のないIssueは並列でエージェントに割り当てる。Wave内の依存関係・並列可否は `docs/開発計画.md` の表を参照
- Issueを新たに追加する場合も、必ず「Wave」「依存Issue」「ラベル(`area:infra`/`area:editor`/`area:mobile`/`area:monetize`/`area:qa`)」を明記し、`docs/開発計画.md` の対応表も更新する
- 特に `EDIT-F08-1`(#19、作品シェアの投稿DBスキーマ)はスマホ版の読む機能(`MOBILE-SP01` #23)が直接参照するため、変更時は影響範囲を確認する

## テスト方針

- holonica-studioのような厳密なTDDフルサイクル(1テストずつRed→Green→Refactor)は、今回のスピード優先(1ヶ月目安リリース)とは相性が悪いため採用しない
- 各Issue実装後は、軽いスモークテスト(手動確認 or 最小限のユニットテスト)を行う運用とする
- この方針は暫定。品質上の懸念が出てきた場合はユーザーと相談して見直す

## Git運用

- リポジトリ: `ichiro16go/daredemo-manga`
- ブランチ運用は未確定(holonicaの `main`/`dev` 分離のような運用にするかは今後決める)
