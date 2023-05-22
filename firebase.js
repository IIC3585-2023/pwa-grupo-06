import { getMessaging, getToken, onMessage } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-messaging.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-app.js";
const firebaseConfig = {
    apiKey: "AIzaSyA-toGx8coidWYspBsuKWdIJuZp-dM_Pbs",
    authDomain: "pwa-g6.firebaseapp.com",
    projectId: "pwa-g6",
    storageBucket: "pwa-g6.appspot.com",
    messagingSenderId: "144479401328",
    appId: "1:144479401328:web:020cf45f116d226d1e8bb5"
};
const app = initializeApp(firebaseConfig);
// const messaging = firebase.messaging(app);
export const messaging = getMessaging(app);

Notification.requestPermission()
  .then(function () {
    console.log('Notification permission granted.');
    return getToken(messaging, { vapidKey: 'BLHZLAWEW1kvTgiPvKIb5dkmYgZACiBMHyO1_0PeIvWuzN8lZKLFK9LM1Z8BUzSzCchwc73C0ur4b5nSilJok18'});
  })
  .then(function (token) {
    console.log(token);
    localStorage.setItem('token', token)
  })
  .catch(function (err) {
    console.log('Unable to get permission to notify.', err);
  });

onMessage(function (payload) {
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

export const sendNotification = (title, data) => {
    const message = {
        title: title,
        body: data,
        token: localStorage.getItem('token')
      };
    messaging.send(message)
    .then((response) => {
    console.log('Successfully sent message:', response);
    })
    .catch((error) => {
    console.log('Error sending message:', error);
    });
}