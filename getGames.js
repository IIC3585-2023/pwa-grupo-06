import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js';
import { initializeFirestore, collection, getDocs, persistentLocalCache } from 'https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js';

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
const db = initializeFirestore(app, {localCache: persistentLocalCache(/*settings*/{})});

async function getGames() {
  const gamesData = {}
  const gamesQuerySnapshot = await getDocs(collection(db, "games"));
  gamesQuerySnapshot.forEach((doc) => {
    gamesData[doc.id] = doc.data();
  });

  console.log(gamesData);

  // HACER AQUI LOS CAMBIOS EN EL HTML
  

  return gamesData;
}

getGames();