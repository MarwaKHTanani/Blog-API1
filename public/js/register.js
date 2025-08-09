import myFetch from "../utilities/myFetch.js";
import { createHtmlElement, customAppendChild } from "../utilities/dom.js";

export const createRegister = () => {
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
  const loginBtn = createHtmlElement(
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
    "Login",
    {
      click: (e) => {
        e.preventDefault();
        document.dispatchEvent(new Event("navigateToLogin"));
      },
    }
  );
  customAppendChild(containerDiv, title, loginBtn);
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
    "Create a New Account"
  );

  const registerForm = createHtmlElement("form", ["space-y-6"], "", {
    submit: async (e) => {
      e.preventDefault();
      console.log("submit!");
      errorMsg.classList.add("hidden");
      const form = e.target;
      const firstname = form.firstname.value.trim();
      const secondname = form.secondname.value.trim();
      const password = form.password.value.trim();

      if (!firstname || !secondname || !password) {
        errorMsg.classList.remove("hidden");
        return;
      }
      myFetch(
        "/users/register",
        "POST",
        (err, data) => {
          if (err) {
            errorMsg.textContent = "Registration failed. Please try again.";
            errorMsg.classList.remove("hidden");
            console.error(err);
            return;
          }
          document.dispatchEvent(new Event("navigatePost"));
        },
        {
          firstname,
          secondname,
          password,
        }
      );
    },
  });

  const firstNameDiv = createHtmlElement("div");
  const labelFirstName = createHtmlElement(
    "label",
    ["block", "text-gray-700", "font-medium", "mb-2"],
    "First Name"
  );
  const inputFirstName = createHtmlElement("input", [
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
  inputFirstName.type = "text";
  inputFirstName.name = "firstname";
  inputFirstName.placeholder = "Enter your first name";

  const secondNameDiv = createHtmlElement("div");
  const labelSecondName = createHtmlElement(
    "label",
    ["block", "text-gray-700", "font-medium", "mb-2"],
    "Secound Name"
  );
  const inputSecondName = createHtmlElement("input", [
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
  inputSecondName.type = "text";
  inputSecondName.name = "secondname";
  inputSecondName.placeholder = "Enter your second name";

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

  const registerBtn = createHtmlElement(
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
    "Register"
  );
  const errorMsg = createHtmlElement(
    "p",
    ["text-red-600", "mt-2", "text-sm", "hidden"],
    "Fill in all fields"
  );

  customAppendChild(firstNameDiv, labelFirstName, inputFirstName);
  customAppendChild(secondNameDiv, labelSecondName, inputSecondName);
  customAppendChild(passDiv, labelPass, inputPass);
  customAppendChild(
    registerForm,
    firstNameDiv,
    secondNameDiv,
    passDiv,
    registerBtn,
    errorMsg
  );
  customAppendChild(cardDiv, h2, registerForm);
  customAppendChild(mainContent, cardDiv);
  customAppendChild(app, nav, mainContent);
};
