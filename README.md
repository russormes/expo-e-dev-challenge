# Exponential-e developer technical challenge
Below I outline a few of the features I have added to give an idea of how I approach an SPA and RESTful server.

## Client
Off-line first using service worker API.

Progressive web app with a manifest file.

Open on mobile in chrome browser: https://russormes.github.io/expo-e-dev-challenge/

In menu, select `add to homescreen`. You can now open the page as an app. Again, turn off data and wifi and re-open the app, it will load off-line.


## Server
```sh
$ npm start
```
Open the app at `http:localhost:3000`.
### Logging

### Testing
```sh
$ npm t
```

#### coverage
```sh
$ npm run coverage
```
Open the file 'coverage/lcov-report/logger/index.js.html' in your browser.
