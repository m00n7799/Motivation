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
let students;
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
  if (namespace == "sync") {
    getUserSign(changes);
  }
  if (namespace == "local") {
    console.log(students);

    gradeChange(changes);
  }
});
function gradeChange(changes) {
    console.log(changes["studnetSelection"].newValue);
    students = changes["studnetSelection"].newValue;

  let gradToChange = changes["studentGradeSelection"].newValue;
  let letterGrade = changes["studnetNewLetter"].newValue;
  let helpME = `/Users/${students}/Grades/${gradToChange}`;
  firebase
    .database()
    .ref()
    .child(helpME)
    .set(letterGrade);
}
function getUserSign(changes) {
  // console.log(changes)
  var storageChange = changes["email"];
  USER_SIGNED_IN = storageChange.newValue;
  // console.log(storageChange.newValue);
  localStorage.setItem("User", `<h1>Hello ${USER_SIGNED_IN}</h1>`);
  let pass;
  chrome.storage.sync.get(["password"], function(result) {
    pass = result.key;
  });
  let ref1 = db.ref("Users");
  ref1.on("value", gotData, err);
  let ref2 = db.ref("websites");
  ref2.on("value", gotData2, err);
}
//#endregion
// firebase.database().ref().child('/Users/1/Grades').update({ '3': "A"});

//#region Writing and reading data
let names;
let grades;
let role;
let overAll = [];
let UserInfo;

function gotData(data) {
  let userGrad = "";
  let info = data.val();
  let keysOfInfo = Object.keys(info);

  for (let x = 0; x < keysOfInfo.length; x++) {
    let k = keysOfInfo[x];
    names = info[k].Name;
    grades = info[k].Grades;
    role = info[k].Role;
    // console.log(names, grades);
    if (role == "Student") {
      if (names == USER_SIGNED_IN) {
        for (let y = 0; y < grades.length; y++) {
          if (grades[y] == "F") {
            overAll.push(grades);
          } else {
            overAll.pop();
          }
          userGrad += `<li style='display:block;'> ${y}: ${grades[y]}</li>`;
        }
        localStorage.setItem("Role", role);
        UserInfo = `Here are your grades right now: ${userGrad}`;
      }
    }
    if (role == "Teacher") {
      let studen = "";
      let maybeThis = [];
      let thisTo = [];
      if (names == USER_SIGNED_IN) {
        for (let i = 0; i < keysOfInfo.length; i++) {
          let k2 = keysOfInfo[i];
          names2 = info[k2].Name;
          grades2 = info[k2].Grades;
          role2 = info[k2].Role;

          if (role2 == "Student") {
            for (let grad = 0; grad < grades2.length; grad++) {
              console.log(names2, grades2);
              // userGrad += `${grades2[grad]}`;
              thisTo.push(grades2[grad]);
            }
            thisTo.push(",");

            maybeThis.push(names2);
            userGrad = "";
          }
        }
        localStorage.setItem("Role", role);
        localStorage.setItem("Names", maybeThis);

        UserInfo = thisTo;
      }
    }
  }

  localStorage.setItem("UserInfo", UserInfo);
}
let websites = [];
function gotData2(data) {
  let info = data.val();
  let keysOfInfo = Object.keys(info);

  for (let x = 0; x < keysOfInfo.length; x++) {
    let k = keysOfInfo[x];
    names = info[k].WebsiteName;
    Links = info[k].Link;

    websites.push(Links);
  }
}
function err(error) {
  console.log(error);
}

//#endregion

chrome.webRequest.onBeforeRequest.addListener(
  function(details) {
    for (let x = 0; x < overAll.length; x++) {
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
    urls:
      // websites
      [
        "https://*.youtube.com/*",
        "https://www.twitch.tv/*",
        "https://www.netflix.com/*",
        "https://www.hulu.com/*",
        "https://www.disneyplus.com/*"
      ]
  },
  ["blocking"]
);
