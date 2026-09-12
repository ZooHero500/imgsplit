# 日本語翻訳 審校レポート — ImgSplit

**審校日**: 2026-03-22
**対象ファイル**:
- `src/messages/ja.json`（UI + マーケティング文言）
- `src/lib/pseo/ja.ts`（SEO ランディングページ）

**照合元**:
- `src/messages/en.json`
- `src/lib/pseo/en.ts`
- `translate/01-analysis.md`（術語表・審校基準）

---

## 1. 問題一覧（重要度順）

### 重大（Critical）

| # | ファイル | キー / 箇所 | 現在のテキスト | 問題 | 修正案 |
|---|---------|-------------|---------------|------|--------|
| C1 | ja.json | `hero.description` | 「ピクセル単位の精度」 | 用語表では「ピクセル精度」を指定。「ピクセル単位」は features 系でも混在しており、用語不統一。用語表の "pixel-perfect" = "ピクセル精度" に統一すべき | 「ピクセル精度」に統一（hero.description, features.preciseDesc, steps.step2Desc 等でも確認） |
| C2 | ja.json | `hero.description` | 「スナップ整列」 | 用語表通り。ただし `features.preciseDesc` でも「スナップ整列」、`steps.step2Desc` でも「スナップ整列」で統一されている点は良い。問題なし → 取り消し | — |
| C3 | ja.json | `trust.qualityLabel` | 「劣化なしの品質」 | EN "Lossless Quality"。用語表では lossless = "ロスレス/劣化なし"。「劣化なしの品質」はやや不自然。トラストバッジとして短く明快にすべき | 「劣化なしの高品質」または「ロスレス品質」 |
| C4 | ja.json | `grid.metadata.description` | 「プライバシー安全」 | 日本語として不自然（「プライバシー安全」は形容動詞として座りが悪い） | 「プライバシーも安心」 |
| C5 | ja.json | `grid.landing.hero.description` | 「プライバシー安全」 | 同上 | 「プライバシーも安心」 |

### 中等（Medium）

| # | ファイル | キー / 箇所 | 現在のテキスト | 問題 | 修正案 |
|---|---------|-------------|---------------|------|--------|
| M1 | ja.json | `features.preciseTitle` | 「ピクセル単位の精密分割」 | EN "Pixel-Perfect Splitting"。用語表 "pixel-perfect" = "ピクセル精度"。「精密」は近いが用語表に合わせるべき | 「ピクセル精度の分割」 |
| M2 | ja.json | `trust.qualityDesc` | 「ピクセル単位で完全一致」 | EN "Pixel-for-pixel quality"。意味は伝わるが「完全一致」はやや硬い。UI のトラストラベルとしてもう少し柔らかく | 「ピクセル単位で品質を維持」 |
| M3 | ja.json | `benefits.headlinePart1` + `headlineAccent` | 「複雑さに」+「さようなら」 | EN "Say Goodbye to Complexity"。直訳すぎて翻訳臭がある。日本のマーケ文言として不自然 | 「面倒な操作は」+「もう不要」 |
| M4 | ja.json | `useCases.headlinePart1` + `headlineAccent` | 「無限の」+「可能性」 | EN "Endless Possibilities"。日本語マーケ文言としては許容範囲だが、ツールの実用性を考えるとやや大げさ | 「広がる」+「活用シーン」（より具体的） |
| M5 | ja.json | `faq.headlinePart1` + `headlineAccent` | 「疑問に」+「お答えします」 | EN "Questions Answered"。自然だが「疑問」はやや硬い | 許容範囲。変更不要 |
| M6 | ja.json | `results.downloadSelected` | 「選択をダウンロード」 | 「選択を」は目的語として不自然。「選択した画像をダウンロード」か短縮形にすべき | 「選択分をダウンロード」 |
| M7 | ja.json | `results.downloadSelectedCount` | 「選択をダウンロード（{count}）」 | 同上 | 「選択分をダウンロード（{count}）」 |
| M8 | ja.json | `grid.landing.cta.headlinePart1` + `headlineAccent` | 「準備は」+「できましたか？」 | EN "Ready to Split?"。「準備はできましたか？」は丁寧だが CTA としての力が弱い。もう少しアクション志向に | 「今すぐ」+「グリッド分割」 |
| M9 | ja.json | `steps.step3Desc` | 「結果が要件を満たしているかチェック」 | 「要件を満たしている」はビジネス文書的すぎる。EN "confirm the results meet your needs" のニュアンスは「希望通りか確認」 | 「結果が期待通りか確認できます」 |
| M10 | ja.json | `workspace.linesNotCrossing` | 「分割線が画像と交差していません」 | EN "Split lines don't intersect the image"。意味は正しいが、エラーメッセージとして「交差」は直訳的。ユーザーにとってわかりやすい表現に | 「分割線が画像の範囲内にありません」 |
| M11 | ja.ts (pseo) | `split-in-half.seo.description` | 「ピクセル精度の無料オンラインツール」 | ここでは用語表通り「ピクセル精度」を使用しているが、ja.json 側と不統一。ja.json 側を合わせるべき（C1参照） | ja.json 側を「ピクセル精度」に統一 |
| M12 | ja.ts (pseo) | `split-for-print.faqEntries[0]` | 「家庭用プリンターにはA4（210×297mm）が標準です」 | EN は "A4 (210×297mm) or US Letter (8.5×11in)" と両方記載。日本向けなので US Letter 省略は妥当だが、完全性のために言及してもよい | 許容範囲。日本市場ではA4のみで問題なし |
| M13 | ja.ts (pseo) | `no-photoshop-slicer.scenarios[0].description` | 「Creative Cloudの月額サブスクリプション不要で」 | EN は "$22/month" と具体的な金額を記載。日本版では金額を省略しており、これは正解（価格は地域で異なるため） | 問題なし |
| M14 | ja.json | `features.headlinePart1` + `headlineAccent` | 「プロ仕様の」+「ツール群」 | EN "Professional Tools"。「ツール群」はやや硬い | 「プロ仕様の」+「ツール」でシンプルに |
| M15 | ja.json | `grid.landing.types.3x3Desc` | 「Instagramや各種SNSに最適な定番の9分割レイアウト」 | EN で "WeChat Moments" を言及。用語表では ja → "SNS" に置換。ここでは「Instagram」と「各種SNS」で適切にローカライズ済み | 問題なし |
| M16 | ja.json | `cta.headlineAccent` | 「始めよう」 | です/ます体ではなく、辞書形+よう。CTA見出しとしては許容範囲だが、他の見出し（「お答えします」「できましたか？」）との整合性がやや不統一 | 許容範囲。CTA のヘッドラインは短いインパクト重視で例外可 |

### 軽微（Minor）

| # | ファイル | キー / 箇所 | 現在のテキスト | 問題 | 修正案 |
|---|---------|-------------|---------------|------|--------|
| m1 | ja.json | `metadata.title` | 「写真を簡単にカット＆分割」 | EN は "Split & Cut"（順序が逆）。意味的には問題なし | 問題なし。自然な日本語語順 |
| m2 | ja.json | `benefits.noPsTitle` | 「Photoshop は不要」 | 「Photoshop」の前後に半角スペースあり。他の箇所（`benefits.noPsDesc`）では「Photoshop の」とスペースあり。一貫しているが、日本語組版としてはスペースなしも一般的 | 許容範囲。プロジェクト内で統一されていれば問題なし |
| m3 | ja.json | `upload.fileTooLarge` | 「ファイル「{name}」が20MBを超えています」 | 鉤括弧「」でファイル名を囲むのは日本語として自然。問題なし | 問題なし |
| m4 | ja.json | `workspace.shortcutHints` | 「Space+ドラッグでパン」 | 「パン」（pan）は一般ユーザーには馴染みが薄い可能性 | 「Space+ドラッグで移動」の方がわかりやすい |
| m5 | ja.json | `grid.gap.label` | 「白枠」 | EN "White Border"。「白枠」は簡潔で良い | 問題なし |
| m6 | ja.json | `aiSegmentation.title` | 「AIセグメンテーション」 | EN "AI Segmentation"。「セグメンテーション」はカタカナだが AI 文脈では一般的。ただし `aiSegmentation.stepSegment` は「分割」と訳しており、混在感がある | 「AI 自動分割」の方が一般ユーザーにわかりやすい |
| m7 | ja.json | `aiSegmentation.isolatedPreview` | 「個別表示」 | EN "Isolated"。「個別表示」は意味としてやや弱い。分離・独立したプレビューのニュアンス | 「単独表示」または「切り抜き表示」 |
| m8 | ja.json | `footer.tagline` | 「オンライン画像分割ツール — 無料 · 安全 · 高速」 | EN "Free · Secure · Fast"。「安全」は EN の "Secure" の訳としては問題ないが、他の箇所で「プライバシー安全」と使っているため微妙な重複感 | 許容範囲 |
| m9 | ja.ts (pseo) | `split-horizontally.hero.description` | 「水平分割線を追加して画像を上下のセクション、ストリップ、行に分割」 | 「ストリップ」は一般ユーザーに馴染みが薄い可能性 | 「帯状画像」または省略して「上下のセクションや行に分割」 |
| m10 | ja.ts (pseo) | `split-vertically.scenarios[0].title` | 「マンガ・コミック パネル分割」 | EN "Multi-Panel Comic Strips"。「マンガ・コミック」は重複表現（マンガ ≒ コミック）。「パネル」の前に半角スペースが混在 | 「マンガのコマ分割」または「コミックパネルの分割」 |
| m11 | ja.ts (pseo) | `split-for-wechat` 全般 | — | EN ではこのページが元々 "WeChat Moments" 向けだったが、SEO/hero で SNS 一般に適切にローカライズ済み。タイトル「SNSグリッド投稿用 画像分割ツール」は適切 | 問題なし。良いローカライズ |
| m12 | ja.ts (pseo) | `split-long-screenshot.relatedTools[2]` | `title: "SNSグリッド分割"` | EN は "WeChat Moments Splitter" → 「SNSグリッド分割」は用語表に沿った良いローカライズ | 問題なし |
| m13 | ja.json | `toolsHub.categoryDirection` | 「方向で分割」 | EN "Split by Direction"。「方向で分割」は自然 | 問題なし |
| m14 | ja.json | `toolsHub.categoryUseCase` | 「用途で分割」 | EN "Split by Use Case"。「用途で分割」は自然 | 問題なし |
| m15 | ja.json | `toolsHub.metadata.description` | 「SNS向け」 | EN では "WeChat" と記載。日本向けに「SNS」に変更済み。適切 | 問題なし |

---

## 2. 術語一致性チェック

| 用語（EN） | 用語表指定（JA） | ja.json での使用 | ja.ts (pseo) での使用 | 判定 |
|-----------|----------------|-----------------|---------------------|------|
| split line | 分割線 | 分割線 | 分割線 | 一致 |
| snap alignment | スナップ整列 | スナップ整列 | スナップ整列 | 一致 |
| pixel-perfect | ピクセル精度 | ピクセル単位の精度 / ピクセル単位の精密 | ピクセル精度 | **不一致** — ja.json が用語表と異なる |
| browser-based | ブラウザ完結 | ブラウザ内で完結 / ブラウザ内処理 | ブラウザ処理 / ブラウザ内完結 | 部分一致 — 表現に揺れあるが許容範囲 |
| grid splitting | グリッド分割 | グリッド分割 | グリッド分割 | 一致 |
| lossless | ロスレス/劣化なし | 劣化なし | — | 一致 |
| drag and drop | ドラッグ＆ドロップ | ドラッグ＆ドロップ | ドラッグ＆ドロップ | 一致 |
| ZIP download | ZIP ダウンロード | ZIPでまとめてダウンロード | ZIPでダウンロード | 一致（文脈による展開は自然） |
| upload | アップロード | アップロード | アップロード | 一致 |
| tile | タイル | タイル | タイル | 一致 |
| nine-grid / 3x3 | 九分割 | 9分割 | 9分割 | 一致（アラビア数字・漢数字の差異は軽微） |
| carousel (IG) | カルーセル | カルーセル | カルーセル | 一致 |
| WeChat Moments | SNS / LINE | SNS / LINE | SNS | 一致（適切なローカライズ） |
| split/slice | 分割/カット | 分割/カット | 分割/スライス | 一致 |

**結論**: pixel-perfect の訳に ja.json と ja.ts (pseo) 間で不統一あり。修正推奨。

---

## 3. です/ます体 一致性チェック

| 箇所 | テキスト | 形式 | 判定 |
|------|---------|------|------|
| `hero.description` | 「...ブラウザ内で完結します。」 | ます体 | OK |
| `benefits.noPsDesc` | 「...誰でも簡単にできます。」 | ます体 | OK |
| `benefits.subtitle` | 「...画像を分割しましょう。」 | ましょう体 | OK（勧誘） |
| `faq.a1` | 「...対応しています。...20MBです。」 | ます体 | OK |
| `cta.headlineAccent` | 「始めよう」 | 辞書形+よう | **例外** — CTA見出しなので許容 |
| `grid.landing.hero.headlinePart2` | 「しよう」 | 辞書形+よう | **例外** — 見出しなので許容 |
| `workspace.addLinesFirst` | 「先に分割線を追加してください」 | ください体 | OK |
| `upload.loadFailed` | 「...もう一度お試しください。」 | ください体 | OK |
| `steps.step3Desc` | 「...チェック。」 | 体言止め | **やや不統一** — 他のstepDescは「ます体」or「体言止め」混在 |

**結論**: 概ね統一されている。見出し部分の辞書形使用は CTA として自然で問題なし。`steps.step3Desc` の体言止めは他の step の表現と統一すると良い。

---

## 4. プレースホルダー完整性チェック

全プレースホルダー（`{count}`, `{name}`, `{size}`, `{time}`, `{selected}`, `{total}`, `{current}`）が EN/JA 間で完全一致。問題なし。

---

## 5. 技術用語保持チェック

以下の技術用語がすべて原文のまま保持されていることを確認:
- PNG, JPG, JPEG, WebP: OK
- ZIP: OK
- 20MB, 50MB: OK
- 3x3, 1x3, 2x2: OK（全角×使用で統一）
- Ctrl+Z, Ctrl+Shift+Z, Delete, Space, Cmd+0, Cmd+1: OK
- Instagram, Photoshop, ImgSplit: OK
- 1080x1080px: OK
- A4, 210x297mm: OK

---

## 6. SNS プラットフォームローカライズチェック

| EN 原文 | JA 翻訳 | 判定 |
|---------|---------|------|
| WeChat Moments | SNS / LINE | OK — 用語表通り |
| Xiaohongshu | 各種SNS | OK — 用語表通り |
| Instagram | Instagram（そのまま） | OK — グローバルプラットフォーム |

---

## 7. SEO 品質チェック

### ja.json メタデータ
- **title**: 「無料オンライン画像分割ツール — 写真を簡単にカット＆分割 | ImgSplit」（52文字）→ 適切な長さ。「画像 分割」「無料」「オンライン」のキーワード含む。
- **description**: 155文字程度 → 適切。主要キーワード網羅。

### ja.ts (pseo) SEO タイトル長チェック
| ページ | title | 文字数 | 判定 |
|--------|-------|--------|------|
| split-in-half | 画像を半分に分割 — 無料オンライン二等分ツール \| ImgSplit | 33 | OK |
| split-horizontally | 画像を横方向に分割 — 無料オンライン水平カッター \| ImgSplit | 35 | OK |
| split-vertically | 画像を縦方向に分割 — 無料オンライン垂直カッター \| ImgSplit | 35 | OK |
| split-into-equal-parts | 画像を均等に分割 — 無料オンライングリッド分割ツール \| ImgSplit | 36 | OK |
| split-long-screenshot | 長いスクリーンショットをページ分割 — 無料オンラインツール \| ImgSplit | 38 | OK |
| split-for-instagram | Instagram カルーセル・グリッド用画像分割 — 無料オンラインツール \| ImgSplit | 42 | OK |
| split-for-wechat | SNSグリッド投稿用 画像分割ツール — 無料オンライン \| ImgSplit | 36 | OK |
| split-for-print | 大きな画像を印刷用に分割 — 無料タイル印刷ツール \| ImgSplit | 33 | OK |
| no-photoshop-slicer | 無料オンライン画像スライサー — Photoshop不要 \| ImgSplit | 34 | OK |

すべて60文字以内で適切。日本語の検索キーワードも適切に含まれている。

---

## 8. 総合評価

### スコア: **85/100 — 良好（Good）**

### 良い点
1. **プレースホルダー完全一致** — 技術的な翻訳ミスなし
2. **SNS ローカライズが適切** — WeChat/小紅書 → SNS/LINE への変換が一貫
3. **技術用語の保持** — PNG, JPG, WebP, ZIP 等すべて原文維持
4. **です/ます体の統一** — ほぼ全面的に丁寧語で統一
5. **SEO タイトル長** — すべて適切な範囲内
6. **自然な日本語** — 大部分が翻訳臭なく自然に読める
7. **カタカナ/漢字の使い分け** — ブラウザ、アップロード等適切

### 改善推奨事項（優先度順）
1. **[重大]** 「ピクセル精度」vs「ピクセル単位の精度/精密」の用語不統一を修正 → 用語表の「ピクセル精度」に統一
2. **[重大]** 「プライバシー安全」→「プライバシーも安心」に修正（2箇所）
3. **[中等]** 「複雑さにさようなら」→ より自然な日本語マーケ表現に修正
4. **[中等]** 「選択をダウンロード」→「選択分をダウンロード」に修正
5. **[中等]** 「結果が要件を満たしているかチェック」→ 自然な表現に修正
6. **[中等]** 「ツール群」→「ツール」に簡素化
7. **[軽微]** 「パン」→「移動」に変更（ショートカットヒント）
8. **[軽微]** 「AIセグメンテーション」→「AI 自動分割」を検討
9. **[軽微]** 「マンガ・コミック パネル分割」の重複表現を修正

### 修正が不要な箇所
- FAQ の回答文体（丁寧で自然）
- グリッド分割ページ全般（高品質）
- pseo ページの大部分（適切にローカライズ済み）
- 印刷用分割ページの US Letter 省略（日本市場では適切）
- Creative Cloud の金額省略（地域差を考慮した良い判断）
