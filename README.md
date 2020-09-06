# discord-bot-template
huda0209式 discord botのテンプレート

## 使い方
1. 適当なディレクトリを作り、そこにクローン
   ```https://github.com/huda0209/discord-bot-template.git```
2. ```npm install```を実行
3. `.env`にトークンをセット(MAIN_TOKENはメイン使用 TEST_TOKENはテスト用)
4. ```node main.js main```でメイントークンでbotログイン
　 \n```node main.js test```でテストトークンでbotログイン(第三引数を指定しない場合はメイントークンでログインします。)

## その他
ready, guildCreate, guildUpdate, guildMemberAdd, message, guildMemberUpdate, messageReactionAdd のイベント呼び出しコードを書いています。
\nこのコードを起動した後にサーバーに招待すると自動でconfigにデータを追加します。
\nmessageイベントにはストップ機能とコマンドハンドラを実装しています。コマンドハンドラはこのページの方のを拝借しました。
[簡易的なコマンドハンドラのサンプル -Discord.js Japan User Group](https://scrapbox.io/discordjs-japan/%E7%B0%A1%E6%98%93%E7%9A%84%E3%81%AA%E3%82%B3%E3%83%9E%E3%83%B3%E3%83%89%E3%83%8F%E3%83%B3%E3%83%89%E3%83%A9%E3%81%AE%E3%82%B5%E3%83%B3%E3%83%97%E3%83%AB)

## 作成者
- [huda0209](https://github.com/huda0209)

## ライセンス
MITライセンス