#!/bin/bash

set -eu

if [ $# -ne 1 ]; then
  echo "require a argument for number of cards" 1>&2
  exit 1
fi

echo "create "$1" cards."

for i in `seq $1`
do
node create-card/create-card-of-backlog.js
done