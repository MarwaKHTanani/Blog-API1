import { createBlogPage } from "./blog.js";
import { createLogin } from "./login.js";
import { createRegister } from "./register.js";

document.addEventListener("DOMContentLoaded", () => {
  createLogin();
});
document.addEventListener("navigateToRegister", () => {
  document.querySelector(".app").innerHTML = "";
  createRegister();
});

document.addEventListener("navigateToLogin", () => {
  document.querySelector(".app").innerHTML = "";
  createLogin();
});
document.addEventListener("navigatePost", () => {
  document.querySelector(".app").innerHTML = "";
  createBlogPage();
});
