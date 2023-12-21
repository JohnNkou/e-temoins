#/bin/bash

sudo apt-get update -y
sudo apt-get upgrade -y

#installing nginx php8.1-fpm unzip php8.1-mysql

sudo DEBIAN_FRONTEND=noninteractive NEEDRESTART_MODE=a apt-get install nginx php8.1-fpm unzip php8.1-mysql php-curl php-mbstring -y
sudo systemctl stop nginx;

#installing awscli
curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
unzip awscliv2.zip
sudo ./aws/install

#downloading token an installing repositories

aws s3 cp s3://e-temoins/token .
aws s3 cp s3://e-temoins/token2 .
token=`cat token`
token2=`cat token2`

git clone -b prod https://${token}@github.com/JohnNkou/e-temoins.git
cd /var/www/html
sudo git clone https://${token2}@github.com/gauthierntudi/e-temoins.git
cd

#installing node

aws s3 cp s3://e-temoins/soft/node.tar.xz .
sudo tar -xJvf node.tar.xz -C /usr/local/lib/
sudo ln -s /usr/local/lib/node*/bin/* /usr/local/bin/

#installing nginx configuration

sudo s3 cp --recursive s3://e-temoins/config/nginx /etc/nginx

#building e-temoins

cd e-temoins
npm install && npm run build && npm run prod 1> ok.log 2> error.log;

#run nginx

sudo systemctl start nginx;