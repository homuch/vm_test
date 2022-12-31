用test資料夾裡面的測試
打 node t.js
可以改 t.js裡面的code ，測試sandbox完整性
要從外部給的utility function 在sandbox裡面定義
現在這樣會佔到一個變數空間(_creat....)，之後有空會改成直接執行new Proxy在black list