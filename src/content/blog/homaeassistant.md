---
title: "在 Synology NAS 上利用 Docker 部署 Home Assistant 打造智慧家庭"
description: "這篇文章用來在 Synology NAS 上利用 Docker 部署 Home Assistant 打造智慧家庭。"
pubDate: "Nov 27 2025"
heroImage: "/images/homeassistant.png"
tags: ["sysnlogy", "homeassistant", "教學","Dacker"]
---



# 在 Synology NAS 上利用 Docker 部署 Home Assistant 打造智慧家庭

Home Assistant（簡稱 HA）是一款功能強大的智慧家庭中樞，能整合 Apple HomeKit、Google Home、智慧插座、感測器、攝影機等多種設備。  
如果你手上有 Synology 群暉 NAS，那麼利用 Docker 部署 Home Assistant 是一個輕鬆又穩定的選擇。

下面將帶你一步步了解部署流程，以及部署後可以做些什麼。

---

## 📌 1. 準備 Synology NAS

開始之前，請確認：

- NAS 正常連接到網路  
- DSM 系統已更新到最新版本  
- 型號支援 Docker（如 DS220+、DS720+、DS920+ 等 Plus 系列）

---

## 📌 2. 安裝 Docker 套件

1. 登入 DSM  
2. 打開「套件中心」  
3. 搜尋 **Docker**（DSM 7.2 之後可能叫 Container Manager）  
4. 點擊「安裝」  

安裝完成後，你就可以在 NAS 上建立和管理容器。

---

## 📌 3. 建立 Home Assistant 的設定資料夾

建議先在 NAS 建立一個資料夾，讓 HA 的設定檔集中管理：

/docker/homeassistant

yaml
複製程式碼

這裡會存放 HA 的所有設定、整合資料、自動化等。

---

## 📌 4. 部署 Home Assistant Docker 容器

你可以透過 SSH 或 Docker 內建終端機執行下列指令：

```sh
docker run -d --name=home-assistant --restart=always \
-v /volume1/docker/homeassistant:/config \
-e TZ=Asia/Taipei \
-p 8123:8123 \
homeassistant/home-assistant
替換內容：

/volume1/docker/homeassistant：你配置的資料夾位置

TZ=Asia/Taipei：你的時區

執行後，NAS 就會開始下載 Home Assistant 並建立容器。

📌 5. 首次開啟 Home Assistant
當容器啟動後，就能透過瀏覽器進入 HA：

cpp
複製程式碼
http://NAS_IP:8123
範例：

cpp
複製程式碼
http://192.168.1.10:8123
首次登入需要：

建立管理者帳號

設定語言、地區、單位

完成初始設定流程

完成後，就可以進入 Home Assistant 主畫面。

📌 6. 常見基本設定
進入 Home Assistant 後，可以先完成以下幾項設定：

✔ 整合常見設備
HA 支援多種平台，如：

HomeKit

Google Home

YeeLight / 小米生態系

Philips Hue

裝置追蹤器（Router、手機…）

大多數設備 HA 會自動偵測，你只要按「設定」就能加入。

✔ 設定自動化流程
常見例子：

夜間自動開燈

外出模式關閉所有電燈和插座

溫度過低自動開啟暖氣

感測到移動後打開走廊燈

HA 的自動化可以透過介面拖曳完成，也可以使用 YAML。

📌 7. 更新與維護
Home Assistant 更新非常頻繁，建議每隔一段時間更新一次：

sh
複製程式碼
docker pull homeassistant/home-assistant
docker stop home-assistant
docker rm home-assistant
# 再重新執行一次 docker run 指令即可
不用擔心設定會消失，因為全部都存在 /config 資料夾裡。

📌 8. 結語
透過 Synology NAS + Docker 部署 Home Assistant，可以讓你的智慧家庭更穩定、更集中、更自由。不管你是要整合 HomeKit、建立 Zigbee 網路，或是打造複雜的自動化流程，HA 都能滿足你的需求。

如果你想讓家裡的設備變得更聰明、更自動化，Home Assistant 絕對值得一試。