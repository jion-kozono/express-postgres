#bin/bash
set -eu

DIR=$(pwd)

export $(cat ${DIR}/.env)
node ${DIR}/index.js
