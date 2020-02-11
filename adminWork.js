let divForUser = document.getElementById("user");
let divForGrades = document.getElementById("grades");
let btn = document.getElementById("btn");
divForUser.style.width = "200px";
divForUser.innerHTML = localStorage.getItem("User");

btn.style.display = "none";
divForGrades.style.width = "200px";
let rol = localStorage.getItem("Role");

if (rol == "Student") {
    divForGrades.innerHTML = `${localStorage.getItem("UserInfo")}`;
    // localStorage.clear();
}
if (rol == "Teacher") {
  let names = localStorage.getItem("Names");
  console.log(names.split(","));
  let nameArr = names.split(",");
  // divForGrades.innerHTML = ;
  let studentNames = [];
  for (let x = 0; x < nameArr.length; x++) {
    studentNames.push(`<option value = ${x + 1}>${nameArr[x]}</option>`);
  }

  divForGrades.innerHTML = `<select id='whichStudents'>${studentNames}<select>`;
  let selection = document.getElementById("whichStudents");
  var selected = selection.options[selection.selectedIndex].value;
  var selec = selected;
  console.log(selected);
  selection.addEventListener("change", e => {
    selec = selection.options[selection.selectedIndex].value;
    if (selec == 3) {
      selec =4;
    }
    console.log(selec);
  });
  let grades = localStorage.getItem("UserInfo");

  let StudentGrad = grades.split(",,");
  let arrOfGrades = [];
  for (let i = 0; i < StudentGrad.length; i++) {
    let StudentGrad2 = StudentGrad[i].split(",");
    if (StudentGrad2[0] == "") {
      StudentGrad2.shift();
    }
    console.log(StudentGrad2);
    arrOfGrades.push(StudentGrad2);
  }
  console.log(arrOfGrades);

  btn.style.display = "block";
  btn.innerHTML = "Update Student";
  btn.addEventListener("click", e => {
    let which = document.createElement("p");
    let subBTN = document.createElement("button");
    let whatWasSelected;
    if (selec == 4) {
      
      whatWasSelected =selec - 2;
      console.log(whatWasSelected);
    }else{

      whatWasSelected= selec - 1;
      console.log(whatWasSelected);

    }
    let studentGrades = [];
    for (let y = 0; y < arrOfGrades.length; y++) {
      console.log(whatWasSelected);
      if (whatWasSelected == y) {

        for (let x = 0; x < arrOfGrades[y].length; x++) {
          console.log(arrOfGrades[y][x]);

          studentGrades.push(
            `<option value = ${x}>${arrOfGrades[y][x]}</option>`
          );
        }
      }
    }
    which.innerHTML = `<select id='gradID'>${studentGrades}</select>`;
    divForGrades.appendChild(which);

    let gradId = document.getElementById("gradID");
    var gradSelect = gradId.options[gradId.selectedIndex].value;
    var gradSelec = gradSelect;
    console.log(gradSelec);
    gradId.addEventListener("change", e => {
      gradSelec = gradId.options[gradId.selectedIndex].value;
    });
    console.log(gradSelec);

    subBTN.innerHTML = "Change grades";
    divForGrades.appendChild(subBTN);
    btn.style.display = "none";
    subBTN.addEventListener("click", e => {
      console.log(selec, gradSelec);
      let gradeChange = document.createElement("input");
      gradeChange.placeholder = "What grade is it going to be now?";
      gradeChange.style.width = "200px";

      let sBTN = document.createElement("button");
      sBTN.innerHTML = "Submit grade change";

      divForGrades.appendChild(gradeChange);
      divForGrades.appendChild(sBTN);


      sBTN.addEventListener("click", e => {
          
        let value1 = gradeChange.value;
        gradeChange.style.display = 'none';
        subBTN.style.display = 'none';
        sBTN.innerHTML = 'Refresh the page to see the change.';
        window.location.reload();
        console.log(value1);
            chrome.storage.local.set(
                { studnetSelection: selec, studentGradeSelection: gradSelec, studnetNewLetter:value1  },
                function() {
                  console.log("Saved");
                }
              );
      });
    });
  });
}

