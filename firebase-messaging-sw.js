importScripts('https://www.gstatic.com/firebasejs/7.14.6/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/7.14.6/firebase-messaging.js');

const firebaseConfig = {
    apiKey: "AIzaSyA-toGx8coidWYspBsuKWdIJuZp-dM_Pbs",
    authDomain: "pwa-g6.firebaseapp.com",
    projectId: "pwa-g6",
    storageBucket: "pwa-g6.appspot.com",
    messagingSenderId: "144479401328",
    appId: "1:144479401328:web:020cf45f116d226d1e8bb5"
  };

firebase.initializeApp(firebaseConfig);
const messaging=firebase.messaging();

messaging.setBackgroundMessageHandler(function (payload) {
    console.log(payload);
    const notification=JSON.parse(payload);
    const notificationOption={
        body:notification.body,
        icon:notification.icon
    };
    return self.registration.showNotification(payload.notification.title,notificationOption);
});