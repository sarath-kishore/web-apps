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
    // auth.signOut();






//     $( document ).ready(function() {
//   new WOW().init();
// });


function LightenDarkenColor(col, amt) {
  
    var usePound = false;
  
    if (col[0] == "#") {
        col = col.slice(1);
        usePound = true;
    }
 
    var num = parseInt(col,16);
 
    var r = (num >> 16) + amt;
 
    if (r > 255) r = 255;
    else if  (r < 0) r = 0;
 
    var b = ((num >> 8) & 0x00FF) + amt;
 
    if (b > 255) b = 255;
    else if  (b < 0) b = 0;
 
    var g = (num & 0x0000FF) + amt;
 
    if (g > 255) g = 255;
    else if (g < 0) g = 0;
 
    return (usePound?"#":"") + (g | (b << 8) | (r << 16)).toString(16);
  
}

// let btncolor = "#0D1B2A";
let btncolor = "#F44334";

let btncolorlight = LightenDarkenColor(btncolor, 20);
let btncolordark = LightenDarkenColor(btncolor, -20);
let btncolorlightdark = LightenDarkenColor(btncolor, -10);

    document.documentElement.style.setProperty('--btncolorlight', `${btncolorlight}`);
    document.documentElement.style.setProperty('--btncolorlightdark', `${btncolorlightdark}`);
    document.documentElement.style.setProperty('--btncolordark', `${btncolordark}`);
    document.documentElement.style.setProperty('--btncolor', `${btncolor}`);