# Shoalter Tool

## Author

- [Jason Jiang](https://github.com/st890670)

## 安裝方式

- 將整個 repository clone 回 local
- 管理擴充功能
  ![](https://i.imgur.com/UZUi7Zvl.png)
- 右上角打開開發人員模式
  ![](https://i.imgur.com/JphjcVz.png)
- 載入未封裝項目
  ![](https://i.imgur.com/jNZLFKQ.png)
- 選擇專案底下的 extension-tool 資料夾即可

## 開發注意事項

- 修改`public/manifest.json`
- 使用`/*global chrome*/`讓 eslint 不檢查 chrome API
