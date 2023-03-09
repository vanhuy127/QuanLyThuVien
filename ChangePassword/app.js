let studentID = document.querySelector("#username");
let password = document.querySelector("#password");
let btnSubmit = document.querySelector(".btn-submit");
let newPassword = document.querySelector("#newPassword");
let confirmNewPassword = document.querySelector("#confirmNewPassword");
const userApi = "http://localhost:3000/account";

function showError(input, message) {
  let parent = input.parentElement;
  let small = parent.querySelector("small");
  parent.classList.add("error");
  small.innerText = message;
}

function showSuccess(input) {
  let parent = input.parentElement;
  let small = parent.querySelector("small");
  parent.classList.remove("error");
  small.innerText = "";
}
function checkEmptyError(listInput) {
  let isEmptyError = false;
  listInput.forEach((input) => {
    input.value = input.value.trim();

    if (!input.value) {
      showError(input, "Khong duoc de trong");
      isEmptyError = true;
    } else {
      showSuccess(input);
    }
  });
  return isEmptyError;
}

function checkLengthError(input, min, max) {
  input.value = input.value.trim();

  if (input.value.length < min) {
    showError(input, `Phai co it nhat ${min} ky tu`);
    return true;
  }
  if (input.value.length > max) {
    showError(input, `Khong duoc vuot qua ${max} ky tu`);
    return true;
  }

  return false;
}

function checkMatchPasswordError(passwordInput, cfPassWordInput) {
  if (passwordInput.value !== cfPassWordInput.value) {
    showError(cfPassWordInput, "Mat khau khong trung khop");
    return true;
  }
  return false;
}

function start() {
  updateUser(function (users) {
    handleChangePw(users);
  });
}

function updateUser(callback) {
  fetch(userApi)
    .then((res) => res.json())
    .then(callback);
}
function putUser(id, data) {
  console.log(id, data);

  var option = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };
  fetch(`${userApi}/${id}`, option)
    .then(function (res) {
      return res.json();
    })
    .then(function () {
      window.location = "../Login.html";
    });
}
function handleChangePw(users) {
  btnSubmit.addEventListener("click", function () {
    let isEmptyError = checkEmptyError([
      studentID,
      password,
      newPassword,
      confirmNewPassword,
    ]);

    let isUsernameLengthError = checkLengthError(studentID, 3, 15);
    let isPasswordLengthError = checkLengthError(password, 3, 15);
    let isNewPasswordLengthError = checkLengthError(newPassword, 3, 15);
    let isCfNewPasswordLengthError = checkLengthError(
      confirmNewPassword,
      3,
      15
    );
    let isMatchNewPassword = checkMatchPasswordError(
      newPassword,
      confirmNewPassword
    );
    if (
      isEmptyError ||
      isUsernameLengthError ||
      isPasswordLengthError ||
      isNewPasswordLengthError ||
      isCfNewPasswordLengthError ||
      isMatchNewPassword
    ) {
    } else {
      for (let i = 0; i < users.length; i++) {
        if (
          users[i].username == studentID.value &&
          users[i].password == password.value
        ) {
          let data = {
            username: studentID.value,
            password: newPassword.value,
          };
          putUser(users[i].id, data);
        }
      }
    }
  });
}
start();
