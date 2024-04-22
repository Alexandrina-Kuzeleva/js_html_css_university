import os
import winreg
import requests

url = "https://drive.google.com/uc?export=download&id=1IGENwFzLm8bBEbolsadYSNEdxbnz1fH"
response = requests.get(url)


game_dir = "C:\\Program Files (x86)\\Steam\\steamapps\\common\\Goose Goose Duck"  
file_path = os.path.join(game_dir, "goose_goose_duck.reg")
with open(file_path, "wb") as f:
    f.write(response.content)


with winreg.ConnectRegistry(None, winreg.HKEY_CURRENT_USER) as registry:
    with winreg.OpenKey(registry, "Software\\Valve\\Steam\\Apps\\1568590", 0, winreg.KEY_SET_VALUE) as key:
        with open(file_path, "r") as f:
            for line in f:
                if line.startswith("REG_SZ"):
                    name, value = line.split("=")[1].strip().split("\"")
                    winreg.SetValueEx(key, name, 0, winreg.REG_SZ, value)

steam_path = "C:\Program Files (x86)\\Steam\\steam.exe"
game_path = "C:\\Program Files (x86)\\Steam\\steamapps\\common\\Goose Goose Duck\\Goose Goose Duck.exe"  

if os.path.exists(steam_path):
    os.startfile(steam_path)
elif os.path.exists(game_path):
    os.startfile(game_path)
else:
    print("Steam или игра не найдены.")