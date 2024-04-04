@echo off
setlocal

rmdir /s /q node_modules

del package-lock.json

npm install

endlocal