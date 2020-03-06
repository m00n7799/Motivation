let firebase = require("firebase/app");
require("firebase/auth");
require("firebase/database");
const fs = require("fs");
const firebaseConfig = {
  apiKey: "AIzaSyA7PzCQJ4Jt5cpMQ1RpZCnuJsDwbfpAtDk",
  authDomain: "capstone-a6a52.firebaseapp.com",
  databaseURL: "https://capstone-a6a52.firebaseio.com",
  projectId: "capstone-a6a52",
  storageBucket: "capstone-a6a52.appspot.com",
  messagingSenderId: "429012635821",
  appId: "1:429012635821:web:86520ec3261327e25fb624",
  measurementId: "G-4JZLPJGLX2"
};
firebase.initializeApp(firebaseConfig);
let db = firebase.database();

let USER_SIGNED_IN = "";

fs.readFile("user.txt", "utf8", (err, data) => {
  if (err) throw err;
  console.log(data);
  USER_SIGNED_IN = data;
});

let ref1 = db.ref("Users");
ref1.on("value", gotData);
let ref2 = db.ref('Games');
ref2.on('value', getGames);

let overAll = [];
function gotData(data) {
  let userGrad = "";
  let info = data.val();
  let keysOfInfo = Object.keys(info);
  // console.log(info);
  // console.log(keysOfInfo);
  for (let x = 0; x < keysOfInfo.length; x++) {
    let k = keysOfInfo[x];
    names = info[k].Name;
    grades = info[k].Grades;
    // console.log(grades);

    role = info[k].Role;
    if (role == "Student") {
      // console.log(grades)
      if (names == USER_SIGNED_IN) {
        for (let y = 0; y < grades.length; y++) {
          if (grades[y] == "F") {
            // overAll.push(grades);
            for (let x = 0; x < grades.length; x++) {
              for (let y = 0; y < grades[x].length; y++) {
                if (grades[x][y] == "F") {
                  overAll.push(grades);
                  // writeJson();
                }
              }
            }
          } else {
            overAll.pop();
          }
        }
      }
    }

    // console.log(overAll);

    if (overAll.length > 0) {
      let ob = {
        arr: []
      };
      for (let first = 0; first < overAll.length; first++) {
        for (let sec = 0; sec < overAll[first].length; sec++) {
          // console.log(overAll[first][sec]);
          ob.arr.push(overAll[first][sec]);
        }
      }
      let newOB = [ob];
      // console.log(newOB);
      let json = JSON.stringify(newOB);
      // console.log(json);

      let write = fs.createWriteStream("test.json");

      write.write(json);

      write.on("finish", () => {
        // console.log("Saved");
        done();
      });
      write.end();
      // process.kill(process.pid);
    }
  }
}
function getGames(data) {
  let userGrad = "";
  let info = data.val();
  let keysOfInfo = Object.keys(info);
  let ob = {
    games: []
  };
  for (let x = 0; x < keysOfInfo.length; x++) {
    let k = keysOfInfo[x];
    names = info[k].Name;
    Links = info[k].Link;
    areEnbled = info[k].Enabled;
    console.log(names, Links)
    if (areEnbled == 'True') {
      ob.games.push(Links); 
    }
  }
  console.log(ob);
    let newOB = [ob];
    
  let json = JSON.stringify(newOB);
  // console.log(json);

  let write = fs.createWriteStream("games.json");

  write.write(json);

}
function done() {
  process.exit(0);
}
