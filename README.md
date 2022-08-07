usage:

1. make sure node-version is correct (was built with node v.18.7.0)
2. CLI: npm install
3. CLI: npm run start:build:ssr
4. wait for 'Express server started at http://localhost:9000'
5. open Browser, go to: http://localhost:9000

This was made using latest version of MUI (5). Therefore JSS was not used because it is declared legacy: https://mui.com/system/styles/advanced/
Default styling-engine for MUI is emotion, so this was used instead.
