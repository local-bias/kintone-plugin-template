<h1 align="center">
  <p align="center">Kintoneプラグインテンプレート</p>
</h1>

<p align="left">
 <a href="https://twitter.com/lbribbit"><img src="https://img.shields.io/twitter/follow/lbribbit?logo=twitter&style=for-the-badge" align="right" alt="Twitter Follow" /></a>
 <a href= "https://github.com/prettier/prettier"><img alt="code style: prettier" src="https://img.shields.io/badge/CODE%20STYLE-PRETTIER-orange?style=for-the-badge"></a>
<a href="#license"><img src="https://img.shields.io/github/license/local-bias/kintone-plugin-template?style=for-the-badge"></a>
</p>
<p align="center">Typescript + Reactでkintoneプラグインを作成するひな形です。</p>

プラグインの設定パターンを複数用意することを想定して作成しています。

例えば「フィールドを指定して非表示にする」というプラグインであれば、指定するフィールドを複数設定することを想定しています。

## 使い方

1. 各種ライブラリをインストールします

```
npm install
```

2. プラグインの秘密キーを作成

```
npm run init
```

3. プラグインを作成し、ご利用の Kintone へアップロード + ファイルの変更を監視

```
npm run start
```

4. リリース用 zip ファイルの生成

```
npm run build
```

## 新規で作成するにあたって最低限修正が必要なファイル

- src/manifest

- types/plugin.d.ts

  - プラグインの設定情報の型をここで定義しています

- common/statics.ts

  - 設定画面に表示する、ホームページなどの各リンク情報はここで定義しています

## 依存ライブラリ

### Luxon(日付操作)

[公式ドキュメント](https://moment.github.io/luxon)

Moment.js がメンテナンスモードに入り、その後継となるライブラリです。

[developer network に紹介する記事があります](https://developer.cybozu.io/hc/ja/articles/900000985463-Luxon-%E3%82%92%E4%BD%BF%E3%81%A3%E3%81%A6-kintone-%E3%81%AE%E6%97%A5%E4%BB%98%E3%82%84%E6%97%A5%E6%99%82%E3%83%95%E3%82%A3%E3%83%BC%E3%83%AB%E3%83%89%E3%81%AE%E3%83%95%E3%82%A9%E3%83%BC%E3%83%9E%E3%83%83%E3%83%88%E3%82%92%E3%82%AB%E3%82%B9%E3%82%BF%E3%83%9E%E3%82%A4%E3%82%BA%E3%81%99%E3%82%8B)。

### recoil(状態管理)

[公式ドキュメント](https://recoiljs.org/)

### immer(immutability)

[公式ドキュメント](https://immerjs.github.io/immer/)
