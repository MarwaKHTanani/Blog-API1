import myFetch from "../utilities/myFetch.js";
import { createHtmlElement, customAppendChild } from "../utilities/dom.js";

export const createLogin = () => {
  const app = document.querySelector(".app");
  const nav = createHtmlElement("nav", ["bg-white", "shadow-md"]);
  const containerDiv = createHtmlElement("div", [
    "mx-auto",
    "py-4",
    "flex",
    "justify-between",
    "items-center",
  ]);
  const title = createHtmlElement(
    "a",
    ["text-2xl", "font-bold", "text-purple-600", "hover:text-purple-800"],
    "Blog"
  );
  const registerBtn = createHtmlElement(
    "a",
    [
      "px-4",
      "py-2",
      "border",
      "border-purple-600",
      "text-purple-600",
      "rounded",
      "hover:bg-purple-600",
      "hover:text-white",
      "transition",
    ],
    "Register",
    {
      click: (e) => {
        e.preventDefault();
        document.dispatchEvent(new Event("navigateToRegister"));
      },
    }
  );
  customAppendChild(containerDiv, title, registerBtn);
  customAppendChild(nav, containerDiv);

  const mainContent = createHtmlElement("main", [
    "flex-grow",
    "flex",
    "items-center",
    "justify-center",
  ]);
  const cardDiv = createHtmlElement("div", [
    "bg-white",
    "rounded-lg",
    "shadow-lg",
    "p-8",
    "max-w-md",
    "w-full",
    "mx-4",
    "my-10",
  ]);
  const h2 = createHtmlElement(
    "h2",
    ["text-2xl", "font-bold", "text-gray-800", "mb-6", "text-center"],
    "Login to Your Account"
  );

  const loginForm = createHtmlElement("form", ["space-y-6"], "", {
    submit: async (e) => {
      e.preventDefault();

      errorMsg.classList.add("hidden");
      const form = e.target;
      const firstnameValue = form.firstname.value.trim();
      const passwordValue = form.password.value.trim();

      myFetch(
        "/users/login",
        "POST",
        (err, users) => {
          if (err) {
            errorMsg.classList.remove("hidden");
            return;
          }
          document.dispatchEvent(new Event("navigatePost"));
        },
        {
          firstname: firstnameValue,
          password: passwordValue,
        }
      );
    },
  });
  const userDiv = createHtmlElement("div");
  const labelUser = createHtmlElement(
    "label",
    ["block", "text-gray-700", "font-medium", "mb-2"],
    "Username"
  );
  const inputUser = createHtmlElement("input", [
    "w-full",
    "px-4",
    "py-2",
    "border",
    "border-gray-300",
    "rounded-md",
    "focus:outline-none",
    "focus:ring-2",
    "focus:ring-purple-500",
  ]);
  inputUser.type = "text";
  inputUser.name = "firstname";
  inputUser.placeholder = "Enter your username";

  const passDiv = createHtmlElement("div");
  const labelPass = createHtmlElement(
    "label",
    ["block", "text-gray-700", "font-medium", "mb-2"],
    "Password"
  );
  const inputPass = createHtmlElement("input", [
    "w-full",
    "px-4",
    "py-2",
    "border",
    "border-gray-300",
    "rounded-md",
    "focus:outline-none",
    "focus:ring-2",
    "focus:ring-purple-500",
  ]);
  inputPass.type = "password";
  inputPass.name = "password";
  inputPass.placeholder = "Enter your password";

  const loginBtn = createHtmlElement(
    "button",
    [
      "w-full",
      "bg-purple-600",
      "text-white",
      "py-3",
      "rounded-md",
      "font-semibold",
      "hover:bg-purple-700",
      "transition",
    ],
    "Login"
  );
  const errorMsg = createHtmlElement(
    "p",
    ["text-red-600", "mt-2", "text-sm", "hidden"],
    "Invalid username or password"
  );

  customAppendChild(userDiv, labelUser, inputUser);
  customAppendChild(passDiv, labelPass, inputPass);
  customAppendChild(loginForm, userDiv, passDiv, loginBtn, errorMsg);
  customAppendChild(cardDiv, h2, loginForm);
  customAppendChild(mainContent, cardDiv);
  customAppendChild(app, nav, mainContent);
};
