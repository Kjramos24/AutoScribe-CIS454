const form = document.querySelector("form"),
emailField = form.querySelector(".email-field"),
emailInput = emailField.querySelector(".email"),
passField = form.querySelector(".create-password"),
passInput = passField.querySelector(".password"),
cPassField = form.querySelector(".confirm-password"),
cPassInput = cPassField.querySelector(".cPassword");

// Email Validtion
function checkEmail() {
const emaiPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
if (!emailInput.value.match(emaiPattern)) {
  return emailField.classList.add("invalid"); //adding invalid class if email value do not mathced with email pattern
}
emailField.classList.remove("invalid"); //removing invalid class if email value matched with emaiPattern
}

// Hide and show password
const eyeIcons = document.querySelectorAll(".show-hide");

eyeIcons.forEach((eyeIcon) => {
eyeIcon.addEventListener("click", () => {
  const pInput = eyeIcon.parentElement.querySelector("input"); //getting parent element of eye icon and selecting the password input
  if (pInput.type === "password") {
    eyeIcon.classList.replace("bx-hide", "bx-show");
    return (pInput.type = "text");
  }
  eyeIcon.classList.replace("bx-show", "bx-hide");
  pInput.type = "password";
});
});

// Password Validation
function createPass() {
const passPattern =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

if (!passInput.value.match(passPattern)) {
  return passField.classList.add("invalid"); //adding invalid class if password input value do not match with passPattern
}
passField.classList.remove("invalid"); //removing invalid class if password input value matched with passPattern
}

// Confirm Password Validtion
function confirmPass() {
if (passInput.value !== cPassInput.value || cPassInput.value === "") {
  return cPassField.classList.add("invalid");
}
cPassField.classList.remove("invalid");
}

// Calling Funtion on Form Sumbit
form.addEventListener("submit", (e) => {
e.preventDefault(); //preventing form submitting
checkEmail();
createPass();
confirmPass();

//calling function on key up
emailInput.addEventListener("keyup", checkEmail);
passInput.addEventListener("keyup", createPass);
cPassInput.addEventListener("keyup", confirmPass);

if (
  !emailField.classList.contains("invalid") &&
  !passField.classList.contains("invalid") &&
  !cPassField.classList.contains("invalid")
) {
  location.href = form.getAttribute("action");
}
});


//Script for Dashboard.html
function toggleUserContent() {
  var ud = document.getElementById("dropdown-content");
  if(ud.style.display === "none"){
      ud.style.display = "block";
  }
  else{
      ud.style.display = "none";
  }
}

<<<<<<< HEAD
//show and hide card menu
function toggleCardMenu(a) {
  a.parentNode.getElementsByClassName('menu-content')[0].classList.toggle("show");
}

//show and hide source card menu
function toggleSourceMenu(a) {
  a.parentNode.parentNode.getElementsByClassName('more-content')[0].classList.toggle("show");
}

//new window functions--------------------------------
//pop up new window
function newGroupWindow(){
  var ng = document.getElementById("newgroup-popup");
  if(ng.style.display === "none"){
      ng.style.display = "flex";
  }
  else{
      ng.style.display = "none";
  }
}

//hide newgroup window
function newGroupWindow(){
  var ng = document.getElementById("newgroup-popup");
  if(ng.style.display === "none"){
      ng.style.display = "flex";
  }
  else{
      ng.style.display = "none";
  }
}

// toggle function for showing login and signup button
function toggleLoginButtons() {
  const loginButton = document.querySelector('loginSignupButton');
  const isAuthenticated = checkIfUserIsAuthenticated(); // Replace with authentication check logic
  if (isAuthenticated) {
    loginButton.style.display = 'none';
    signupButton.style.display = 'none';
  } else {
    loginButton.style.display = 'block';
    signupButton.style.display = 'block';
  }
}

