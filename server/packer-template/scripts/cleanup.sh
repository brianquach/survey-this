#!/bin/bash -eux

apt-get clean

dd if=/dev/zero of=/EMPTY bs=1M
rm -f /EMPTY
