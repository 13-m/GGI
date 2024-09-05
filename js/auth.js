document.addEventListener("DOMContentLoaded", function () {
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

  let input = document.getElementById("birthdateInput");
  let span = document.getElementById("spanDate");

  console.log("Here");
  function chechInput() {
    if (input.value) {
      input.style.color = "#000";
      span.classList.add("visible");
    } else {
      input.style.color = "transparent";
      span.classList.remove("visible");
    }
    console.log("Here3");
  }
  input.addEventListener("input", chechInput);
});
