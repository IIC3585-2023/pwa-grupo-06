const firebaseConfig = {
    apiKey: "AIzaSyA-toGx8coidWYspBsuKWdIJuZp-dM_Pbs",
    authDomain: "pwa-g6.firebaseapp.com",
    projectId: "pwa-g6",
    storageBucket: "pwa-g6.appspot.com",
    messagingSenderId: "144479401328",
    appId: "1:144479401328:web:020cf45f116d226d1e8bb5"
};
const app = firebase.initializeApp(firebaseConfig);
const messaging = firebase.getMessaging(app);

messaging
  .requestPermission()
  .then(function () {
    console.log('Notification permission granted.');
    return messaging.getToken();
  })
  .then(function (token) {
    console.log(token);
  })
  .catch(function (err) {
    console.log('Unable to get permission to notify.', err);
  });

let enableForegroundNotification = true;
messaging.onMessage(function (payload) {
    console.log('Message received. ', payload);
    console.log(payload.notification);
    const notification = payload.notification;
    const notificationTitle = notification.title;
    const notificationOptions = {
      body: notification.body,
      icon: './images/icon.svg',
    };
    return new Notification(notificationTitle, notificationOptions);
});