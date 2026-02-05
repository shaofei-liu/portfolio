@echo off
cd /d "C:\Users\chris\Desktop\shaofei-website\portfolio"

REM Fix colors
powershell -Command "(Get-Content 'src/pages/portfolio/ProjectView.js') -replace '#666\"', '#555\"' | Set-Content 'src/pages/portfolio/ProjectView.js'"

REM Fix emojis and encoding
powershell -Command "(Get-Content 'src/pages/portfolio/ProjectView.js' -Raw) -replace '馃敆', '🔗' -replace '馃搳', '📊' -replace '馃搫', '📄' -replace '眉', 'ü' -replace '盲', 'ä' -replace '鈥', '•' | Set-Content 'src/pages/portfolio/ProjectView.js'"

echo Colors and encoding fixed!
