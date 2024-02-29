const firebaseConfig = {

    apiKey: "AIzaSyDstZZJlTZNvAJxHCYbZ5kk0xrniH0hzVY",

  authDomain: "notes-app-b4351.firebaseapp.com",

  projectId: "notes-app-b4351",

  messagingSenderId: "607952282450",

  appId: "1:607952282450:web:7e367db37a0e2ed134108b"

  };

    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);

    const db = firebase.firestore();

    db.settings({
        timestampsInSnapshots: true
    });
    // auth.signOut();
