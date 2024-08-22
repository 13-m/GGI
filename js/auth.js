const btnChange1 = document.getElementById("changeForm1");
const btnChange2 = document.getElementById("changeForm2");
const logInForm = document.getElementById("showLogIn");
const signInForm = document.getElementById("showSingIn");
const container = document.querySelector(".auth__container");

btnChange1.addEventListener("click", (e) => {
  e.preventDefault();

  logInForm.classList.remove("active");

  setTimeout(() => {
    signInForm.classList.add("active");
  }, 1000);
});

btnChange2.addEventListener("click", (e) => {
  e.preventDefault();

  signInForm.classList.remove("active");

  setTimeout(() => {
    logInForm.classList.add("active");
  }, 1000);
});
