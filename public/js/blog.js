import myFetch from "../utilities/myFetch.js";
import { createHtmlElement, customAppendChild } from "../utilities/dom.js";

export const createBlogPage = () => {
  const app = document.querySelector(".app");
  const main = createHtmlElement("main", [
    "flex-grow",
    "container",
    "mx-auto",
    "px-4",
    "py-6",
  ]);
  const createSection = createHtmlElement("section", [
    "mb-10",
    "max-w-xl",
    "mx-auto",
    "bg-white",
    "p-6",
    "rounded-lg",
    "shadow",
  ]);
  const h2 = createHtmlElement(
    "h2",
    ["text-xl", "font-bold", "mb-4"],
    "Create New Post"
  );

  const postForm = createHtmlElement("form", ["space-y-4"], "", {
    submit: (e) => {
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
    },
  });
  const divPostTitle = createHtmlElement("div");
  const postLabelTitle = createHtmlElement(
    "label",
    ["block", "font-medium", "text-gray-700", "mb-1"],
    "Title"
  );
  const postInputTitle = createHtmlElement("input", [
    "w-full",
    "border",
    "border-gray-300",
    "rounded-md",
    "px-3",
    "py-2",
    "focus:outline-none",
    "focus:ring-2",
    "focus:ring-purple-500",
  ]);
  postInputTitle.type = "text";
  postInputTitle.name = "title";
  postInputTitle.placeholder = "Post title";

  const divPostContent = createHtmlElement("div");
  const postLabelcontent = createHtmlElement(
    "label",
    ["block", "font-medium", "text-gray-700", "mb-1"],
    "Content"
  );
  const postTextArea = createHtmlElement("textarea", [
    "w-full",
    "border",
    "border-gray-300",
    "rounded-md",
    "px-3",
    "py-2",
    "focus:outline-none",
    "focus:ring-2",
    "focus:ring-purple-500",
  ]);
  postTextArea.name = "content";
  postTextArea.rows = "4";
  postTextArea.placeholder = "Write your post content here...";
  const publishBtn = createHtmlElement(
    "button",
    [
      "bg-purple-600",
      "text-white",
      "px-6",
      "py-2",
      "rounded-md",
      "font-semibold",
      "hover:bg-purple-700",
      "transition",
    ],
    "Publish"
  );
  publishBtn.type = "submit";

  const errorMsg = createHtmlElement(
    "p",
    ["text-red-600", "mt-2", "text-sm", "hidden"],
    "Fill in all fields"
  );

  customAppendChild(divPostTitle, postLabelTitle, postInputTitle);
  customAppendChild(divPostContent, postLabelcontent, postTextArea);
  customAppendChild(
    postForm,
    divPostTitle,
    divPostContent,
    publishBtn,
    errorMsg
  );
  customAppendChild(createSection, h2, postForm);
  const postsList = createHtmlElement("section", [
    "max-w-xl",
    "mx-auto",
    "space-y-6",
  ]);
  customAppendChild(main, createSection, postsList);
  customAppendChild(app, main);
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
        customAppendChild(postsList, createPostCard(post));
      });
    });
  }
  loadPosts();
};
