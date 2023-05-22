import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js';
import { initializeFirestore, collection, getDocs, persistentLocalCache } from 'https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js';

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
const db = initializeFirestore(app, {localCache: persistentLocalCache(/*settings*/{})});

async function getTeams() {
  const teamsData = {}
  const teamsQuerySnapshot = await getDocs(collection(db, "teams"));
  teamsQuerySnapshot.forEach((doc) => {
    teamsData[doc.id] = doc.data();
  });

  console.log(teamsData);

  // HACER AQUI LOS CAMBIOS EN EL HTML


  return teamsData;
}

getTeams();