let studentID = document.querySelector("#username");
let password = document.querySelector("#password");
let btnSubmit = document.querySelector(".btn-submit");
let form = document.querySelector("form");

// studentID.value = "";
// password.value = "";

const userApi = "http://localhost:3000/account";
function start() {
  getUser(function (users) {
    validateForm(users);
  });
}
start();
function getUser(callback) {
  fetch(userApi)
    .then(function (res) {
      return res.json();
    })
    .then(callback);
}
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

function validateForm(users) {
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    let isEmptyError = checkEmptyError([studentID, password]);

    let isUsernameLengthError = checkLengthError(studentID, 3, 15);
    let isPasswordLengthError = checkLengthError(password, 3, 15);

    if (isEmptyError || isUsernameLengthError || isPasswordLengthError) {
    } else {
      handleLogin(users);
    }
  });
}

function handleLogin(users) {
  let check = false;
  users.map((user) => {
    if (
      studentID.value.trim().toLowerCase() === user.username.toLowerCase() &&
      password.value === user.password
    ) {
      check = true;
    }
  });
  if (check) {
    window.location = "./Layout/index.html";
  } else {
    alert("Tài khoản hoặc mật khẩu không đúng");
  }
}
