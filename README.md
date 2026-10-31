# TripVlog

把一整個資料夾的旅行照片和影片交給 TripVlog，它在你的 Mac 上挑片、照拍攝時間排好、對齊音樂的拍子、配上字幕，
輸出 MP4、直式短版，或交給 Final Cut Pro 接著剪。預設完全離線，影片不上傳。

**下載與安裝說明：<https://tripvlog.fortunefor.me/>**

這個 repo 只放下載頁和安裝檔，沒有原始碼。每個版本的安裝檔在 [Releases](https://github.com/samtu1985/tripvlog/releases)。

## 確認下載的檔案

每個版本的說明都附上 zip 的 SHA-256。在「終端機」執行：

```bash
shasum -a 256 ~/Downloads/TripVlog_*.zip
```

結果要和 Release 說明、下載頁上的值完全一樣。

## 為什麼第一次打開要執行指令

TripVlog 是個人開發的免費軟體，沒有付費加入 Apple 開發者計畫，所以 App 沒有經過 Apple 公證，macOS 會擋下第一次開啟。
確認 SHA-256 相符後，把 App 拖到「應用程式」，再執行一次：

```bash
xattr -dr com.apple.quarantine /Applications/TripVlog.app
```

請只對從這裡下載、而且 SHA-256 相符的檔案這樣做。別的地方轉傳的 TripVlog 不要用這個指令打開。

## 需求

- Apple Silicon（M1 以後）的 Mac，macOS 14 以上，建議 16GB 以上記憶體

## 回報問題

請開 [Issue](https://github.com/samtu1985/tripvlog/issues)，附上 TripVlog 版本和 macOS 版本。請不要附上私人照片或影片。

## 授權

免費使用，詳見 [LICENSE](LICENSE)。
