#!/bin/sh
sleep 10
npm run migrate
npm run seed
exec node -r ./dist/src/server.js