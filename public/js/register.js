import myFetch from "./myFetch.js";
const form = document.getElementById("registerForm");
const errorMsg = document.getElementById("errorMsg");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  console.log("submit!");
  errorMsg.classList.add("hidden");
  const firstname = form.firstname.value.trim();
  const secondname = form.secondname.value.trim();
  const password = form.password.value.trim();

  if (!firstname || !secondname || !password) {
    errorMsg.classList.remove("hidden");
    return;
  }
  fetch(
    "/users/register",
    "POST",
    (err, data) => {
      if (err) {
        errorMsg.textContent = "Registration failed. Please try again.";
        errorMsg.classList.remove("hidden");
        console.error(err);
        return;
      }
      window.location.href = "blog.html";
    },
    {
      firstname,
      secondname,
      password,
    }
  );
});
