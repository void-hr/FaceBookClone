
## Getting Started

To deploy this project run

```bash
cd backend

npm init
npm i express
npm i nodemon
```

nodemon for making our express server auto reloadable.


#### Use Case:
```bash
npm start
```
It is used to run script written within script tag in package.json file. For that you have to specify your json like that:
```bash
 "scripts": {
    "start": "node server.js"
  },
```



If there is something like this:
```bash
npm run server
```
Then it means it is equivalent for this configuration:
```bash
"scripts": {
    "server": "node server.js"
  },
```

For nodemon:
```bash
"scripts": {
    "server": "nodemon server.js"
  },
```

### Refrences:
To update node modules: https://stackoverflow.com/questions/34202617/how-to-update-all-node-js-modules-automatically
