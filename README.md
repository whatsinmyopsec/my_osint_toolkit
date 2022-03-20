## Setup


Clone project \
cd into api folder

Create venv
```python
python -m venv venv
```

Activate venv
```
.\venv\Scripts\activate
```

Install requirements
```
pip install -r ..\requirements.txt
```

Create .flaskenv file in api folder
```
FLASK_APP=api.py
FLASK_ENV=development
```

## Development


Check for any conflicts in installed packages
```
pip check
```

Update list of pinned requirements
```
pip freeze > $target_requirements
```

Create .env
```
URLSCAN_IO_KEY=$your_key
OPSWAT_KEY=$your_key
VT_KEY=$your_key
IBM_KEY=$your_key
IBM_KEY_PASSWD=$your_key_password
IBM_AUTH_TOKEN=$base64 encode of IBM_KEY:IBM_KEY_PASSWD
ABUSEIPDB_KEY=$your_key
IPINFO_TOKEN=$your_token
GREYNOISE_KEY=$your_key
```
## Boot up


start server
```
flask run
```
### URL Scan
    /url/urlscan?url=
    /url/opswat?d=
    /url/vt?query=
### Domain Scan
    /domain/opswat?domain=
    /domain/vt?domain=
### File scan
    /file/vt?file=
    /file/opswat?file=
### DNS Scan
    /dns/ibm?url=
### IP scan
    /ip/ibm?ip=
    /ip/abuse?ip=
    /ip/vt?ip=
    /ip/ipinfo?ip=
    /ip/greynoise?ip=
