## 📦 Installation & Deployment

### 🔧 Local Installation (Sideload)

You can load the Chrome extension manually for development and testing purposes:

1. Open Chrome and navigate to:
   ```
   chrome://extensions/
   ```

2. Enable **Developer Mode** in the top right.

3. Click **“Load unpacked”** and select the `extension/` directory of this repository.

4. Once loaded, the extension will begin logging keystrokes and storing them via `chrome.storage.local`, with data exfiltration via background beaconing.

🧪 **Pro Tip**: Open the Chrome Developer Tools (Console) to inspect debug logs or use `chrome.storage.local.get` to verify key capture before transmission.

---

### 🚀 Uploading to Chrome Web Store (Optional)

> ⚠️ **IMPORTANT**: This extension violates Chrome Web Store policies if used maliciously or without user consent. Upload is only shown here for educational awareness of vetting processes.

1. Ensure all source files are included in your `extension/` directory.

2. Remove or obfuscate any obviously malicious functionality.

3. Create a `ZIP` file of the `extension/` directory.

4. Go to the [Chrome Web Store Developer Dashboard](https://chrome.google.com/webstore/devconsole).

5. Pay the one-time developer fee (currently $5 USD).

6. Click **“Publish” → “Add a New Item”**.

7. Upload the ZIP file, add metadata, descriptions, and icons.

8. Submit for review.

🛑 **Note**: Chrome Web Store conducts automated and human reviews. Any code that accesses user input or sensitive information without user notification is likely to be rejected.

---

## ⚖️ Legal & Ethical Disclaimer

> ❗ **This project is for educational and cybersecurity research purposes only.**

- Do **not** deploy this extension in any production environment without full consent of all affected users.
- Unauthorized keylogging or covert data exfiltration may violate **federal** or **international law**, including the **Computer Fraud and Abuse Act (CFAA)**.
- Use of this tool in real environments should be limited to **authorized red team assessments**, **penetration testing**, or **academic study**.

