# 🕵️‍♂️ Covert Chrome Extension C2 Framework (Research Project)

## 📄 Executive Summary
This project explores a covert Command-and-Control (C2) channel delivered via a Google Chrome extension. It simulates how browser-native APIs can be abused to exfiltrate sensitive information, such as keystrokes, while evading detection using HTTPS and standard web behavior. The infrastructure was deployed securely on AWS using a TLS-enabled Nginx reverse proxy and a Python-based listener.

> ⚠️ **Disclaimer:** This project is for educational and authorized red team research only. All testing was done in a secure lab environment.

---

## 💡 Goals & Objectives
- Explore how Chrome extensions can be used for persistent covert access
- Create an HTTPS-based exfiltration channel using WebSockets and fetch
- Set up a hardened C2 infrastructure on AWS EC2 using TLS
- Investigate how to mimic real-world browser behavior to avoid detection

---

## 🧰 Architecture Overview

### Client-Side: Chrome Extension
- Built using Manifest V3
- Keylogging via `document.onkeydown`
- Stores captured input in `chrome.storage.local`
- Beacons data periodically to remote HTTPS endpoint
- Mimics typical web traffic to avoid detection

### Server-Side
- Python-based HTTP server listens for POST requests
- Nginx reverse proxy handles TLS termination
- Domain managed through Cloudflare DNS
- Let's Encrypt provides SSL certs
- Deployed on AWS EC2 with Elastic IP

---

## 📁 Chrome Extension Components

### manifest.json
- Declares required permissions like `storage` and `<all_urls>`
- Specifies service worker and content script behavior

### content.js
- Captures keystrokes and page URL via `document.onkeydown`
- Appends logs to `chrome.storage.local` for later transmission

### background.js
- Periodically checks for stored logs
- Sends logs to C2 server using fetch or WebSocket
- Clears stored data after transmission

---

## 🚀 Server Deployment

### Step 1: AWS EC2 Launch
- Ubuntu 22.04 LTS
- Instance type: `t3.micro` (free-tier eligible)
- Elastic IP assigned

### Step 2: Nginx Setup
- Installed using `apt`
- Configured to listen on port 443 with SSL
- Routes `/submit` to local Python server on port 8000
- Returns a simple message at `/` for verification

### Step 3: TLS with Let's Encrypt
- Used Certbot with Nginx plugin to issue a certificate for `threathunter.vip`

### Step 4: Python C2 Server
- Listens on `127.0.0.1:8000`
- Handles POST requests at `/submit`
- Writes logs to `keystrokes.txt` for every valid submission

### Step 5: Auto-Startup
- Used `crontab` to start C2 and Nginx on reboot
- Python script launched via shell script with `nohup` to run in background

---

## 🎨 Screenshot Section (Insert These)

- Chrome DevTools with Keylogs shown in `chrome.storage.local`
- Terminal output of C2 server showing received keystrokes
- HTTPS traffic captured in Wireshark or BurpSuite
- Nginx config test output confirming valid cert and config

---

## 🔐 Security & Detection Considerations

### Red Team Techniques
- Uses only standard browser APIs — no exploits
- C2 transport encrypted with TLS over standard ports
- Chrome storage and service worker for persistence

### Blue Team Detection Tips
- Monitor unusual frequency of `chrome.storage.local.get()` calls
- Look for high entropy beacon traffic or unknown host calls
- Analyze extension manifest files for overreaching permissions
- Flag repeated HTTPS traffic to suspicious domains

---

## 🏆 Outcome
This project demonstrates a realistic, end-to-end simulation of a modern threat actor abusing Chrome extensions and cloud infrastructure. The approach highlights detection challenges across both the network and endpoint levels.

---

## 🔧 Future Work
- Add clipboard data collection and DOM scraping
- Implement domain fronting via CDN
- Tune beacon intervals for stealth
- Introduce anomaly-based behavior tagging and classification

---

## 📅 Version
- **Date:** July 11, 2025

---

## ⚖️ License
- This project is licensed under the MIT License

---

## 🚧 Legal
- Research-only tool for ethical red teaming, lab use, and detection training
- Unauthorized use outside of legal environments is prohibited

---
