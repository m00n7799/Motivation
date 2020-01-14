// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyA7PzCQJ4Jt5cpMQ1RpZCnuJsDwbfpAtDk",
  authDomain: "capstone-a6a52.firebaseapp.com",
  databaseURL: "https://capstone-a6a52.firebaseio.com",
  projectId: "capstone-a6a52",
  storageBucket: "capstone-a6a52.appspot.com",
  messagingSenderId: "429012635821",
  appId: "1:429012635821:web:86520ec3261327e25fb624",
  measurementId: "G-4JZLPJGLX2"
};
// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);

let db = firebase.database();
console.log(app.options.databaseURL);
let USER_SIGNED_IN = "";

//#region LogIn
chrome.storage.onChanged.addListener(function(changes, namespace) {
  for (var key in changes) {
    var storageChange = changes[key];
    console.log(
      'Storage key "%s" in namespace "%s" changed. ' +
        'Old value was "%s", new value is "%s".',
      key,
      namespace,
      storageChange.oldValue,
      storageChange.newValue
    );
    //   login.addEventListener("click", e => {
    //   });
  }
  getUserSign(changes);
});
function getUserSign(changes) {
  // console.log(changes)
  var storageChange = changes['email'];

    USER_SIGNED_IN = storageChange.newValue;
    // console.log(storageChange.newValue);
  
  let pass;
  chrome.storage.sync.get(["password"], function(result) {
    pass = result.key;
  });
  let ref1 = db.ref("Students");
  ref1.on("value", gotData, err);
  // let ref2 = db.ref("websites");
  // ref2.on("value", gotData2, err);
}

// const promise = firebase.auth().signInWithEmailAndPassword(emailVal, pass);
// promise.catch(e => console.log(e.message));

//#endregion

//#region Writing and reading data
function writeUserData(userId, name, email) {
  db.ref("users/" + userId).set({
    username: name,
    email: email
  });
  // let userId= firebase.auth().currentUser.uid;
  return firebase
    .database()
    .ref("/users/" + userId)
    .once("value")
    .then(function(snapshot) {
      var username = (snapshot.val() && snapshot.val().username) || "Anonymus";
    });
}
// let ref1 = db.ref("Students");
// ref1.on("value", gotData, err);
// let ref2 = db.ref("websites");
// ref2.on("value", gotData2, err);
let names;
let grades;
let overAll = [];
function gotData(data) {
  let info = data.val();
  let keysOfInfo = Object.keys(info);
  console.log(keysOfInfo);
  for (let x = 0; x < keysOfInfo.length; x++) {
    let k = keysOfInfo[x];
    names = info[k].Name;
    grades = info[k].Grades;
    console.log(USER_SIGNED_IN);
    // console.log(names, grades);
    if (names == USER_SIGNED_IN) {
      for (let y = 0; y < grades.length; y++) {
        if (grades[y] == "F") {
          overAll.push(grades);
        }
        else{
          overAll.pop();
        }
      }
    }
  }
  console.log("overAll: " + overAll);
}
let websites = [];
function gotData2(data) {
  let info = data.val();
  let keysOfInfo = Object.keys(info);

  for (let x = 0; x < keysOfInfo.length; x++) {
    let k = keysOfInfo[x];
    names = info[k].WebsiteName;
    Links = info[k].Link;

    console.log(names, grades);
    websites.push(grades);
  }
}
function err(error) {
  console.log(error);
}

//#endregion

chrome.webRequest.onBeforeRequest.addListener(
  function(details) {
    writeUserData(
      "OpGPIRoAwoRRIOG1MJVUCMyY7ip1",
      "Danny Eastwood",
      "deastwood7799@gmail.com"
    );
    for (let x = 0; x < overAll.length; x++) {
      console.log(overAll[x]);
      for (let y = 0; y < overAll[x].length; y++) {
        if (overAll[x][y] == "F") {
          console.log("-hacker voice- I'm in");

          // return { cancel: true };
          return { redirectUrl: "https://lms.neumont.edu/" };
        }
      }
    }
  },
  {
    urls: [
      "https://*.youtube.com/*",
      "https://www.twitch.tv/*",
      "https://www.netflix.com/*",
      "https://www.hulu.com/*",
      "https://www.disneyplus.com/*"
    ]
  },
  ["blocking"]
);
