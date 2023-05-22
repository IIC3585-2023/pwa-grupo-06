import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js';
import { getFirestore, doc, setDoc } from 'https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js';

const firebaseConfig = {
  apiKey: "AIzaSyBpDnzNVueWQ3QiQg2qX3kpm1V1Pis2ufs",
  authDomain: "pwa-grupo-06.firebaseapp.com",
  projectId: "pwa-grupo-06",
  storageBucket: "pwa-grupo-06.appspot.com",
  messagingSenderId: "202038855165",
  appId: "1:202038855165:web:56dd106586ac9c637ac594",
  measurementId: "G-HW6F1KE7FE"
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