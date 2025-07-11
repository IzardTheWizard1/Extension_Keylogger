# TLS Setup with Certbot

1. Make sure ports 80 and 443 are open
2. Stop Nginx if running: `sudo systemctl stop nginx`
3. Run certbot standalone:
   - `sudo certbot certonly --standalone -d your-domain-here`
4. After success, configure nginx to use the cert:
   - `ssl_certificate /etc/letsencrypt/live/your-domain-here/fullchain.pem;`
   - `ssl_certificate_key /etc/letsencrypt/live/your-domain-here/privkey.pem;`
5. Reload Nginx: `sudo systemctl start nginx`
6. Test with: `curl -k https://your-domain-here`
