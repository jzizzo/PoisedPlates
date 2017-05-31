importScripts('https://unpkg.com/workbox-sw@0.0.2');

const workboxSW = new WorkboxSW({clientsClaim: true});

// This array will be populated by workboxBuild.injectManifest() when the
// production service worker is generated.
workboxSW.precache([
  {
    "url": "/dist/bundle.js",
    "revision": "ec3ff46db539d280bb3f02e82bcddd88"
  },
  {
    "url": "/dist/service-worker.js",
    "revision": "4a0dbdf8a1e9696724dc9f4ff07931dd"
  },
  {
    "url": "/service-worker.js",
    "revision": "5a701443ebf4573fb640d5b5fa65e16d"
  }
]);

workboxSW.router.setDefaultHandler({
  handler: workboxSW.strategies.staleWhileRevalidate()
});
