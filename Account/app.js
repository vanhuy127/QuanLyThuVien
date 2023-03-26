let idStudent = document.querySelector(".idSt .value");
let fullName = document.querySelector(".name .value");
let dayOfBirth = document.querySelector(".dayOfBirth .value");
let className = document.querySelector(".className .value");
let gender = document.querySelector(".gender .value");

let inputName = document.querySelector(".inputName");
let inputDayOfBirth = document.querySelector(".inputDayOfBirth");
let inputClass = document.querySelector(".inputClass");
let inputGender = document.querySelectorAll(
  ".gender-details input[type=radio]"
);

let buttonSubmit = document.querySelector(".button_submit");

let studentInfoAPI = "http://localhost:3000/studentInformation";

function start() {
  getStudentInfo(function (infos) {
    renderInfo(infos);
    handleChangeInfo(infos);
  });
}
start();

function getStudentInfo(callback) {
  fetch(studentInfoAPI)
    .then(function (res) {
      return res.json();
    })
    .then(callback);
}

function renderInfo(data) {
  idStudent.innerHTML = data[0].maSV;
  fullName.innerHTML = data[0].hoTen;
  dayOfBirth.innerHTML = data[0].ngaySinh;
  className.innerHTML = data[0].lop;
  gender.innerHTML = data[0].gioiTinh;
}

function formatDay(date) {
  var inputDate = new Date(date);

  var day = inputDate.getDate();
  var month = inputDate.getMonth() + 1;
  var year = inputDate.getFullYear();

  if (day < 10) {
    day = "0" + day;
  }

  if (month < 10) {
    month = "0" + month;
  }

  return day + "/" + month + "/" + year;
}

function handleChangeInfo(infos) {
  buttonSubmit.addEventListener("click", function () {
    if (
      inputName.value &&
      inputDayOfBirth.value &&
      inputClass.value &&
      (inputGender[0].checked || inputGender[1].checked)
    ) {
      let data = {
        ...infos[0],
        hoTen: inputName.value,
        ngaySinh: formatDay(inputDayOfBirth.value),
        lop: inputClass.value.toLocaleUpperCase(),
        gioiTinh: inputGender[0].checked
          ? inputGender[0].value
          : inputGender[1].value,
      };
      console.log(data);
      handleUpdateInfo(data);
    } else {
      alert("Phải nhập đầy đủ thông tin các trường ^_^");
    }
  });
}
function handleUpdateInfo(data) {
  var option = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };
  fetch(`${studentInfoAPI}/1`, option).then(function (res) {
    return res.json();
  });
  // .then(function () {
  //   window.location = "../Login.html";
  // });
}
