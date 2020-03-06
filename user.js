"use strict";

const email = document.getElementById("email");
const password = document.getElementById("password");
const login = document.getElementById("login");
const logout = document.getElementById("logout");
const divForBTN = document.getElementById("buttonDiv");

    login.addEventListener("click", e => {
      const emailVal = email.value;
      const pass = password.value;
      let Welcome = document.createElement("label");
      Welcome.innerHTML = "Hello, " + emailVal + " if you'd like to check on your grades right click on the extension and click on the options page.";
      divForBTN.appendChild(Welcome);
      divForBTN.style.width = "200px";
      login.style.display = "none";
      email.style.display = "none";
      password.style.display = "none";
      if (emailVal && pass) {
        chrome.storage.sync.set(
          { email: emailVal, password: pass },
          function() {
            console.log("Saved");
          }
        );
      }
    });
