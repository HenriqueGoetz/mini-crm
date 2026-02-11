#!/bin/sh

# Executa setup (migrate + seed)
npm run setup

# Verifica NODE_ENV e executa o commando apropriado
if [ "$NODE_ENV" = "development" ]; then
  npm run dev
else
  npm start
fi
