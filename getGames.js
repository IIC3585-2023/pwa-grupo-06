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

async function getGames() {
  const gamesData = {};
  const gamesQuerySnapshot = await getDocs(collection(db, "games"));
  gamesQuerySnapshot.forEach((doc) => {
    gamesData[doc.id] = doc.data();
  });

  const gamesContainer = document.querySelector(".games"); // Get the games container element

  for (const gameId in gamesData) {
    const game = gamesData[gameId];

    console.log(game);
    // Create a game container element
    const gameContainer = document.createElement("div");
    gameContainer.classList.add("game");

    // Add the game details to the game container
    gameContainer.innerHTML = `
      <div class="details">
        <p class="fecha">${game.date}</p>
      </div>
      <div class="teams">
        <div class="team">
          <div class="details"></div>
          <p class="name">${game.team_1}</p>
          <p class="score">${game.score_1}</p>
        </div>
        <p class="vs">vs</p>
        <div class="team">
          <p class="name">${game.team_2}</p>
          <p class="score">${game.score_2}</p>
        </div>
      </div>
    `;
    // Add onclick event listener to the game container
    gameContainer.addEventListener("click", function () {
      toggleText(this);
    });
    // Append the game container to the games container
    gamesContainer.appendChild(gameContainer);
  }

  // HACER AQUI LOS CAMBIOS EN EL HTML

  return gamesData;
}

function toggleText(box) {
  var boxContents = box.querySelectorAll(".score");
  boxContents.forEach(function (content) {
    if (content.style.display === "none") {
      content.style.display = "block";
    } else {
      content.style.display = "none";
    }
  });
}
getGames();
