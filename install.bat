chcp 65001
cd %~dp0
TASKKILL /IM chrome.exe /F
start chrome --load-extension="%~dp0extension-tool"
