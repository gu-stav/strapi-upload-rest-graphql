import os
import requests
from pathlib import Path

url = "http://localhost:1337/api/upload"

headers = {}
filename = "./blob.png"
file={'files': open(Path(os.getcwd(), filename), 'rb')}
payload={'submit': "Submit"}
response = requests.post(url, files=file, data=payload, headers=headers)
