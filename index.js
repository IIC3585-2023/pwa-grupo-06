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
