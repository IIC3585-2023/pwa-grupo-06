import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";
import {
  initializeFirestore,
  collection,
  getDocs,
  persistentLocalCache,
} from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyA-toGx8coidWYspBsuKWdIJuZp-dM_Pbs",
  authDomain: "pwa-g6.firebaseapp.com",
  projectId: "pwa-g6",
  storageBucket: "pwa-g6.appspot.com",
  messagingSenderId: "144479401328",
  appId: "1:144479401328:web:020cf45f116d226d1e8bb5",
  vapidKey:
    "BLHZLAWEW1kvTgiPvKIb5dkmYgZACiBMHyO1_0PeIvWuzN8lZKLFK9LM1Z8BUzSzCchwc73C0ur4b5nSilJok18",
};

const app = initializeApp(firebaseConfig);
const db = initializeFirestore(app, {
  localCache: persistentLocalCache(/*settings*/ {}),
});

async function getTeams() {
  const teamsData = {};
  const teamsQuerySnapshot = await getDocs(collection(db, "teams"));
  teamsQuerySnapshot.forEach((doc) => {
    teamsData[doc.id] = doc.data();
  });
  const sortedTeams = Object.entries(teamsData).sort(
    (a, b) => b[1].points - a[1].points
  );

  const tableBody = document.querySelector("table tbody");

  for (const [teamId, team] of sortedTeams) {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${team.name}</td>
      <td>${team.points}</td>
      <td>${team.played}</td>
      <td>${team.wins}</td>
      <td>${team.losses}</td>
      <td>${team.draws}</td>
    `;

    tableBody.appendChild(row);
  }
  console.log(teamsData);

  return teamsData;
}

getTeams();
