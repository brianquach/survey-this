#!/bin/bash -eux

echo "Installing Virtualbox Guest Utils"
apt-get -y install dkms
VBOX_VERSION=$(cat ~/.vbox_version)
mount -o loop ~/VBoxGuestAdditions_$VBOX_VERSION.iso /mnt
sh /mnt/VBoxLinuxAdditions.run
umount /mnt

rm ~/VBoxGuestAdditions_$VBOX_VERSION.iso


if [ "$VBOX_VERSION" == '4.3.10' ]; then
  # https://www.virtualbox.org/ticket/12879
  sudo ln -s "/opt/VBoxGuestAdditions-$VBOX_VERSION/lib/VBoxGuestAdditions" /usr/lib/VBoxGuestAdditions
fi
