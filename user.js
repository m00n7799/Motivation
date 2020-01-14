"use strict";
//#region Firebase Auth
// // require(firebase);
// let firebase;
// chrome.storage.sync.get('fire', function(data){
//     firebase = data;
// });
// var firebaseConfig = {
//   apiKey: "AIzaSyA7PzCQJ4Jt5cpMQ1RpZCnuJsDwbfpAtDk",
//   authDomain: "capstone-a6a52.firebaseapp.com",
//   databaseURL: "https://capstone-a6a52.firebaseio.com",
//   projectId: "capstone-a6a52",
//   storageBucket: "capstone-a6a52.appspot.com",
//   messagingSenderId: "429012635821",
//   appId: "1:429012635821:web:86520ec3261327e25fb624",
//   measurementId: "G-4JZLPJGLX2"
// };
// // Initialize Firebase
// const app = firebase.initializeApp(firebaseConfig);

// let db = firebase.database();

// if (login) {

// }

//#endregion
const email = document.getElementById("email");
const password = document.getElementById("password");
const login = document.getElementById("login");
const signup = document.getElementById("signup");
const logout = document.getElementById("logout");
const divForBTN = document.getElementById("buttonDiv");
// function workPls() {
//     let button = document.createElement("button");
//     button.style.backgroundColor = "#639";
//     button.addEventListener("click", function() {
//         console.log("YES!");
//     });
//     divForBTN.appendChild(button);
// }

// workPls();
login.addEventListener("click", e => {
    const emailVal = email.value;
    const pass = password.value;
    if (emailVal&&pass) {
        
        chrome.storage.sync.set({'email': emailVal, 'password': pass}, function(){
            console.log("Saved")
        });
    }
})
