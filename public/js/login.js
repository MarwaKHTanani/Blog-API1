import myFetch from './myFetch.js';
const form = document.getElementById('loginForm');
const errorMsg = document.getElementById('errorMsg');

form.addEventListener('submit', async (e) => {
  e.preventDefault(); 

  errorMsg.classList.add('hidden');

  const firstnameValue = form.firstname.value.trim();
  const passwordValue = form.password.value.trim();

  myFetch('/users/login', 'POST', (err, users) => {
    if (err) {
      errorMsg.classList.remove("hidden");
      return;
    }
    window.location.href = "blog.html";
  }, {
    firstname: firstnameValue,
    password: passwordValue,
  });
});
