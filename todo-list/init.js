const firebaseConfig = {

    apiKey: "AIzaSyC9gzZJt-Ie6u6YlIobdvmVpI6HWCfF3JI",

    authDomain: "testmailfunction.firebaseapp.com",

    projectId: "testmailfunction",

    storageBucket: "testmailfunction.appspot.com",

    messagingSenderId: "149449039988",

    appId: "1:149449039988:web:04e4f16c1de00093e23121"

  };

    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);

    const db = firebase.firestore();

    db.settings({
        timestampsInSnapshots: true
    });
