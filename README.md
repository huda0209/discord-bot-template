# discord-bot-template
huda0209式 discord botのテンプレート

## 使い方
1. リリースからファイルをダウンロードし展開
2. ```yarn init```を実行
3. [Developer Portal](https://discord.com/developers/applications)からPrivileged Intentsを有効化する<br>
![discord-div-Privileged_Intents.png](https://github.com/huda0209/resource/blob/master/discord-bot-template/discord-div-Privileged_Intents.png)<br>
赤枠内のチェックボタンをオンにする<br>
4. config内の`setting.json`にトークンをセット(MAIN_TOKENはメイン使用 DIV_TOKENはテスト用)
5. ```node main.js main```でメイントークンでbotログイン<br>
```node main.js div```でディベロプトークンでbotログイン(第三引数を指定しない場合はメイントークンでログインします。)

## その他
ready, guildCreate, guildUpdate, guildMemberAdd, message, guildMemberUpdate, messageReactionAdd のイベント呼び出しコードを書いています。<br>
このコードを起動した後にサーバーに招待すると自動でconfig/guildにデータを追加します。<br>
messageイベントにはストップ機能とコマンドハンドラを実装しています。コマンドハンドラはこのページの方のを拝借しました。<br>
[簡易的なコマンドハンドラのサンプル -Discord.js Japan User Group](https://scrapbox.io/discordjs-japan/%E7%B0%A1%E6%98%93%E7%9A%84%E3%81%AA%E3%82%B3%E3%83%9E%E3%83%B3%E3%83%89%E3%83%8F%E3%83%B3%E3%83%89%E3%83%A9%E3%81%AE%E3%82%B5%E3%83%B3%E3%83%97%E3%83%AB)

## カラーコンソールの使い方
`logger.info`と入力し、引数にログの内容を設定すると以下のようにログの最初に INFO と表示されます。
![discord-div_console-sample.png](https://github.com/huda0209/resource/blob/master/discord-bot-template/discord-div_console-sample.png)<br>
info warn errorの3つが最初に表示可能です。
また、引数内に`{green}`というように設定するとそれより後ろの文字が装飾されます。
- 文字色変更一覧
{black} {red} {green} {yellow} {magenta} {cyan} {white}
- 背景色変更一覧
{bgblack} {bgred} {bggreen} {bgyellow} {bgmagenta} {bgcyan} {bgwhite}
- リセット
装飾を解除する際は {reset} と設定

## 作成者
- [huda0209](https://github.com/huda0209)

## ライセンス
MITライセンス
