# AWS EC2 Setup Steps

1. Launch EC2 with Ubuntu 22.04 LTS
2. Choose t3.micro instance type
3. Allocate and associate Elastic IP
4. Update DNS (A record for domain to EIP)
5. SSH into EC2 and install required packages:
   - `sudo apt update && sudo apt install nginx certbot python3-pip`
6. Setup NGINX reverse proxy with SSL
7. Create and test Python C2 server
8. Add startup commands in crontab
