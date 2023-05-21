import { initializeApp } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-app.js";
import { getMessaging, getToken, onMessage } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-messaging.js";

const firebaseConfig = {
  apiKey: "AIzaSyA-toGx8coidWYspBsuKWdIJuZp-dM_Pbs",
  authDomain: "pwa-g6.firebaseapp.com",
  projectId: "pwa-g6",
  storageBucket: "pwa-g6.appspot.com",
  messagingSenderId: "144479401328",
  appId: "1:144479401328:web:020cf45f116d226d1e8bb5",
  vapidKey: 'BLHZLAWEW1kvTgiPvKIb5dkmYgZACiBMHyO1_0PeIvWuzN8lZKLFK9LM1Z8BUzSzCchwc73C0ur4b5nSilJok18'
};

const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

function IntitalizeFireBaseMessaging() {
  console.log('por la chuchaaaa')
  Notification.requestPermission()
      .then(function () {
          console.log("Notification Permission");
          return getToken(firebaseConfig);
      })
      .then(function (token) {
          console.log("Token : "+token);
      })
      .catch(function (error) {
          console.log(error);
      });
}

onMessage(function (payload) {
  console.log(payload);
  const notificationOption={
      body:payload.notification.body,
      icon:payload.notification.icon
  };

  if(Notification.permission==="granted"){
      var notification=new Notification(payload.notification.title,notificationOption);
      notification.onclick=function (ev) {
          ev.preventDefault();
          window.open(payload.notification.click_action,'_blank');
          notification.close();
      }
  }

});

// onTokenRefresh(function () {
//   messaging.getToken()
//       .then(function (newtoken) {
//           console.log("New Token : "+ newtoken);
//       })
//       .catch(function (error) {
//           console.log(error);
//       })
// })
IntitalizeFireBaseMessaging();


// function requestPermission() {
//   console.log('Requesting permission...');
//   Notification.requestPermission().then((permission) => {
//     if (permission === 'granted') {
//       console.log('Notification permission granted.')
//     }
//   })
// }
  

// Register the service worker
if ("serviceWorker" in navigator) {
  // Wait for the 'load' event to not block other work
  window.addEventListener("load", async () => {
    // Try to register the service worker.
    try {
      const reg = await navigator.serviceWorker.register("/serviceWorker.js");
      console.log("Service worker registered", reg);
    } catch (err) {
      console.log("Service worker registration failed: ", err);
    }
  });
}

let db;
// Using https://github.com/jakearchibald/idb
async function createDB() {
  try {
    db = await idb.openDB("pwaDB", 1, {
      upgrade(db, oldVersion, newVersion, transaction) {
        switch (oldVersion) {
          case 0:
          // Placeholder to execute when database is created (oldVersion is 0)
          case 1:
            const store = db.createObjectStore("teams", {
              autoIncrement: true,
              keyPath: "id",
            });
            store.createIndex("name", "name");
            console.log("Database and Data store created");
        }
      },
    });
  } catch (e) {
    console.log("Error while creating DB: " + e.message);
  }
}

async function addData() {
  if (db == undefined) {
    console.log("Database is closed");
    return;
  }
  try {
    const team = {
      name: "U. Católica",
    };
    const tx = await db.transaction("teams", "readwrite");
    const store = tx.objectStore("teams");
    const teamInStore = await store.get(1);
    if (teamInStore) {
      console.log("Team is already in store");
      return;
    }
    store.add(team);
    await tx.done;
    console.log("Team added to the database");
  } catch (e) {
    console.log("Error while saving data to DB: " + e.message);
  }
}

async function getData() {
  if (db == undefined) {
    console.log("Database is closed");
    return;
  }
  const teamId = 1;
  const tx = await db.transaction("teams", "readonly");
  const store = tx.objectStore("teams");
  const value = await store.get(teamId);
  if (value) {
    console.log("Data from DB: " + JSON.stringify(value));
  } else {
    console.log("There is no team with such id in store");
  }
}

async function testIndexedDB() {
  await createDB();
  await addData();
  await getData();
}

testIndexedDB();
