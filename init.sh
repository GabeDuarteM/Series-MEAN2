#!/BIN/BASH

trap 'kill %1' SIGINT

cd server/ 
npm start &

cd ../client/
npm start