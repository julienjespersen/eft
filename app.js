const APP = {
    deferredInstall: null,
    init() {
      if ('serviceWorker' in navigator) {
        //register our service worker
        navigator.serviceWorker
          .register('/sw.js', {
            updateViaCache: 'none',
            scope: '/',
          })
          .then(() => {
            //finished registering
          })
          .catch((err) => {
            console.warn('Failed to register', err.message);
          });
        //listen for messages
        navigator.serviceWorker.addEventListener('message', ({ data }) => {
          //received a message from the service worker
          console.log(data, 'from service worker');
        });
  
  
        //listen for `beforeinstallprompt` event
        window.addEventListener('beforeinstallprompt', (ev) => {
          // Prevent the mini-infobar from appearing on mobile
          ev.preventDefault();
          // Stash the event so it can be triggered later.
          APP.deferredInstall = ev;
          console.log('saved the install event');
          // Update UI notify the user they can install the PWA
          // if you want here...
        });
  
        let btn = document.getElementById('btnInstall');
        btn?.addEventListener('click', APP.startChromeInstall);
      }
    },
    startChromeInstall() {
      if (APP.deferredInstall) {
        console.log(APP.deferredInstall);
        APP.deferredInstall.prompt();
        APP.deferredInstall.userChoice.then((choice) => {
          if (choice.outcome == 'accepted') {
            //they installed
            console.log('installed');
          } else {
            console.log('cancel');
          }
        });
      }
    },
  };
  document.addEventListener('DOMContentLoaded', APP.init);