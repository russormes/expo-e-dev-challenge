// Import the Service Worker Toolbox file
importScripts('js/sw-toolbox.js');

const precacheFiles = [
	'./',
	'./index.html',
	'img/expo-e-logo-white.png',

	'css/bootstrap.min.css',
	'css/dashboard.css',
	'js/app.bundle.min.js',
	'js/jquery.min.js',
	'js/bootstrap.min.js'

];

// Precache the files
toolbox.precache(precacheFiles);

// Install and Activate events
self.addEventListener('install', (event) =>
	event.waitUntil(self.skipWaiting())
	// console.log('test');
);

self.addEventListener('activate', (event) =>
	event.waitUntil(self.skipWaiting())
	// event.waitUntil(
	// self.clients.claim())
);

// Fetch events
self.addEventListener('fetch', (event) => {
	event.respondWith(
		caches.match(event.request).then(
			(response) => response || fetch(event.request)
		)
	);
});
