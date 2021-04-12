from flask import Flask, request
from urllib.parse import quote
import os
import requests
import json
import time


app = Flask(__name__)


@app.route("/urlscan", methods=["GET"])
def urlscan():
    url_to_scan = request.args.get("url")  # get the query from the url
    privacy = request.args.get("option")  # Set the privacy of the scan
    headers = {
        "API-Key": os.environ.get("URLSCAN_IO_KEY"),  # Your api key for urlscan.io
        "Content-Type": "application/json",
    }
    response = requests.post(
        "https://urlscan.io/api/v1/scan/",
        headers=headers,
        data={"url": f"{url_to_scan}", "visibility": f"{privacy}"},
    ).json()
    uuid = response["uuid"]  # You need the uuid to get the report of your scan
    time.sleep(30)  # You need to wait for the server to process your request
    scan_results = requests.get(f"https://urlscan.io/api/v1/result/{uuid}/").json()

    return scan_results


# task_url = scan_results['task']['url']
# verdicts_overall_score = scan_results['verdicts']['overall']['score']
# verdicts_overall_malicious = scan_results['verdicts']['overall']['malicious']
# task_report_URL = scan_results['task']['reportURL']


@app.route("/opswat")
def opswat():
    domain_to_scan = request.args.get("domain")  # get the query from the url
    headers = {"apikey": os.environ.get("OPSWAT_KEY")}  # your api key for opswat
    response = requests.get(
        f"https://api.metadefender.com/v4/domain/{domain_to_scan}", headers=headers
    ).json()

    return response


@app.route("/opswaturl")
def opswaturl():
    domain = quote(request.args.get("d"), safe="")  # encode :// to %3A%2F%2F
    headers = {"apikey": os.environ.get("OPSWAT_KEY")}  # your api key for opswat
    response = requests.get(
        f"https://api.metadefender.com/v4/url/{domain}", headers=headers
    ).json()  # make sure the response is json

    return response


@app.route("/vturl")
def vturl():
    query = request.args.get("query")
    url = "https://www.virustotal.com/vtapi/v2/url/scan"
    params = {"apikey": os.environ.get("VT_KEY"), "url": f"{query}"}
    response = requests.post(url, data=params).json()

    resource = response["resource"]
    time.sleep(15)  # API is limited to 4 requests per minute w/ free version
    urlreport = "https://www.virustotal.com/vtapi/v2/url/report"
    params = {"apikey": os.environ.get("VT_KEY"), "resource": f"{resource}"}
    response = requests.get(urlreport, params=params).json()
    return response
