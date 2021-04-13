import requests
import json
import os 
from dotenv import load_dotenv

load_dotenv()
x = os.getenv('URLSCAN_IO_KEY')
print(x)

url_to_scan = "kernal.eu"
privacy = "public"

headers = {'API-Key':os.getenv('URLSCAN_IO_KEY'),'Content-Type':'application/json'}
data={"url": f"{url_to_scan}", "visibility": f"{privacy}"}
response = requests.post('https://urlscan.io/api/v1/scan/',headers=headers, data=json.dumps(data))
print(response)
print(response.json())