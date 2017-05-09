curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.2/install.sh | bash

echo "source /home/vagrant/.nvm/nvm.sh" >> /home/vagrant/.profile

source ~/.profile

nvm install 6.10.3
nvm alias default 6.10.3
nvm use default

npm install
