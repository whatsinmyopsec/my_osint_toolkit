from unicodedata import name
import os
import json
import time
from urllib.parse import quote

try:
    from app import app
    import unittest

except Exception as e:
    print(f"some modules are missing: {e}")


class FlaskTest(unittest.TestCase):
    def test_index(self):
        tester = app.test_client(self)
        response = tester.get("/", content_type="html/text")
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data, b"Hello World!")

    def test_url_opswat(self):
        tester = app.test_client(self)
        url = "/url/opswat?url=https://www.google.com"
        mock_request_headers = {"apikey": os.getenv("OPSWAT_KEY")}

        response = tester.get(url, headers=mock_request_headers)
        self.assertEqual(response.status_code, 200)
    
    def test_url_opswat_malicious(self):
        tester = app.test_client(self)
        url = "/url/opswat?url=https://www.magic4you.nu"
        mock_request_headers = {"apikey": os.getenv("OPSWAT_KEY")}

        response = tester.get(url, headers=mock_request_headers)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data, b'{"Api": "opswat", "Possitive_tags": {"assessment": ["high risk", "Malware"], "provider": ["webroot.com", "avira.com"]}}')

    def test_url_opswat_safe(self):
        tester = app.test_client(self)
        url = "/url/opswat?url=google.com"
        mock_request_headers = {"apikey": os.getenv("OPSWAT_KEY")}

        response = tester.get(url, headers=mock_request_headers)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data, b'{"Api": "opswat", "address": "google.com", "threat_level": "No Threat Detected"}')

    def test_opswat_domain(self):
        tester = app.test_client(self)
        url = "/domain/opswat?domain=google.com"
        mock_request_headers = {"apikey": os.getenv("OPSWAT_KEY")}

        response = tester.get(url, headers=mock_request_headers)
        self.assertEqual(response.status_code, 200)

    def test_domain_vt(self):
        tester = app.test_client(self)
        url = "/domain/vt?domain=google.com"
        mock_request_headers = {"apikey": os.environ.get("VT_KEY")}

        response = tester.get(url, headers=mock_request_headers)
        self.assertEqual(response.status_code, 200)

    def test_ibm_url(self):
        tester = app.test_client(self)
        url = "/dns/ibm?url=https://www.google.com"
        mock_request_headers = {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": f'Basic {os.environ.get("IBM_AUTH_TOKEN")}',
        }
        response = tester.get(url, headers=mock_request_headers)
        self.assertEqual(response.status_code, 200)

    def test_abuse_ip(self):
        tester = app.test_client(self)
        url = "/ip/abuse?ip=197.163.85.251"
        mock_headers = {
            "Accept": "application/json",
            "Key": os.environ.get("ABUSEIPDB_KEY"),
        }
        response = tester.get(url, headers=mock_headers)
        self.assertEqual(response.status_code, 200)


if __name__ == "__main__":
    unittest.main()
