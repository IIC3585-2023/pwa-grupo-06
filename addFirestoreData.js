import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js';
import { getFirestore, doc, setDoc } from 'https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js';

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
const db = getFirestore(app);

fetch('./data/teams.json')
  .then(response => response.json())
  .then(async data => {
    await createTeamsFirestore(data)
    return data
  })
  .catch(error => console.log(error));

fetch('./data/games.json')
  .then(response => response.json())
  .then(async data => {
    await createGamesFirestore(data)
    return data
  })
  .catch(error => console.log(error));


async function createTeamsFirestore(teams) {
  try {
    for (const team in teams) {
      await setDoc(doc(db, "teams", team), teams[team]);
    }
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

async function createGamesFirestore(games) {
  try {
    for (const game in games) {
      await setDoc(doc(db, "games", game), games[game]);
    }
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}