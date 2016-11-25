#!/BIN/BASH

trap 'kill %1; kill %2' SIGINT

./mongod &

cd server/ 
npm start &

cd ../client/
npm start