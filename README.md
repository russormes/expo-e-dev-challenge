# Exponential-e developer technical challenge
Below I outline a few of the features I have added to give an idea of how I approach an SPA and RESTful server.

## Client
### Service Worker
Off-line first using service worker API.

### PWA
Progressive web app with a manifest file.

Open on mobile in chrome browser: https://russormes.github.io/expo-e-dev-challenge/

In menu, select `add to homescreen`. You can now open the page as an app. Again, turn off data and wifi and re-open the app, it will load off-line.

### Build and deploy
This is just an example, to point out a build and deploy flow is needed. This one is not good and would only ever be used for dev or as an example.

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
