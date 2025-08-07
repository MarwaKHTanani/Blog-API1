import myFetch from "./myFetch.js";
const postForm = document.getElementById("postForm");
const postsList = document.getElementById("postsList");
const errorMsg = document.getElementById("errorMsg");

const createHtmlElement = (tag, classes = [], content = "") => {
  const element = document.createElement(tag);
  classes.forEach((cl) => element.classList.add(cl));
  element.textContent = content;
  return element;
};
const createPostCard = (post) => {
  const card = createHtmlElement("div", [
    "bg-white",
    "p-4",
    "rounded-lg",
    "shadow",
  ]);
  const title = createHtmlElement(
    "h3",
    ["text-lg", "font-bold", "mb-2"],
    post.title
  );
  const content = createHtmlElement("p", [], post.content);
  card.appendChild(title);
  card.appendChild(content);
  return card;
};
function loadPosts() {
  myFetch("/posts", "GET", (err, posts) => {
    if (err) {
      errorMsg.textContent = "Failed to load posts";
      errorMsg.classList.remove("hidden");
      return;
    }
    errorMsg.classList.add("hidden");
    postsList.innerHTML = "";
    posts.forEach((post) => {
      const card = createPostCard(post);
      postsList.appendChild(card);
    });
  });
}

postForm.addEventListener("submit", (e) => {
  e.preventDefault();
  errorMsg.classList.add("hidden");
  errorMsg.textContent = "";

  const title = postForm.title.value.trim();
  const content = postForm.content.value.trim();

  if (!title || !content) {
    errorMsg.textContent = "Fill in all fields";
    errorMsg.classList.remove("hidden");
    return;
  }

  myFetch(
    "/posts",
    "POST",
    (err, result) => {
      if (err) {
        errorMsg.textContent = "Failed to create post. Please try again.";
        errorMsg.classList.remove("hidden");
        return;
      }
      postForm.reset();
      loadPosts();
    },
    { title, content }
  );
});

loadPosts();
