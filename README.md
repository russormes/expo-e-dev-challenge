# Exponential-e developer technical challenge
Below I outline a few of the features I have added to give an idea of how I approach an SPA and RESTful server.

```sh
$ npm install
$ npm start
```
Open the app at `http:localhost:3000`.

## Client
The task for the client was trivial and I am not a UI guy, so instead I spent the time on the client to show you how I like to work designing off-line first, progressive web apps.

### Service Worker
Off-line first using service worker API.

![Debugging with chrome-devtools](/docs/serviceWorker.png)

To demo how this works, once you have loaded the page at `http:localhost:3000`, you can turn off the node server and reload the page and see that the application will still load. Even close the window and reopen it without the server running and you will still get the app.

### PWA
[Progressive web app](https://developers.google.com/web/progressive-web-apps/) with a manifest file.

![Debugging with chrome-devtools](/docs/manifest.png)

To demonstrate this the page is hosted [here](https://russormes.github.io/expo-e-dev-challenge/) on github. Please note that for this demonstration the is no server running so when not connecting to a server on 'localhost' the application will just use hardcoded product data.

Open the hosted app on a mobile in chrome browser. Turn off data and wifi and reload the page. It will load the app and run. Turn your wifi back on.

In menu, select `add to homescreen`. You can now find the icon and open the page as an app. Again, turn off data and wifi and re-open the app, it will load off-line.

![Add page as pwa](/docs/pwaAddToHome.png)

### Build and deploy
This is just an example, to point out a build and deploy flow is needed. This one is not good and would only ever be used for dev or as an example.

Running `npm run build` will build the client bundle.
Running `npm run deploy` will build the client bundle, run the tests and push the client to github pages (if you had access to the repo!)

## Server
The structure I have given to the server is an example of how I build restful services. It is missing a layer of seperation in the models and also I have been using JSON schema a lot in my projects to validate the shape of data hitting the endpoints. That is not included here.

### Logging
I included a logging script I wrote for a precious application as it demonstrates two things. One is that I like to log in a shippable format for sending logs to monitoring infrastructure (in this case JSON) and two it has 100% coverage with the included unit tests (see below).

If you look the console where you run the server you will occasionally see a log from this script, as examples.
### Testing
```sh
$ npm t
```
The test are for the logging script at `/lib/logger`.

#### coverage
Istanbul is a great tool for visualizing code coverage from your unit tests.
```sh
$ npm run coverage
```
Open the file 'coverage/lcov-report/logger/index.js.html' in your browser.

## Final comment
I have also begun to use [typescript](https://www.typescriptlang.org/) in my latest projects, which I did not use for this challenge.
