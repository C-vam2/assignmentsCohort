//  start from here
let isSigningUp = false;
let isSigningIn = false;
isAddingTodo = false;

//signing up
document
  .getElementById("signup-container")
  .addEventListener("submit", async (e) => {
    e.preventDefault();
    if (isSigningUp) return;
    isSigningUp = true;

    const username = document.getElementById("signup-username").value;
    const password = document.getElementById("signup-password").value;

    try {
      const response = await fetch("http://localhost:3000/user/signup", {
        method: "POST",
        body: JSON.stringify({ email: username, password }),
        headers: {
          "Content-type": "application/json",
        },
      });

      const result = await response.json();
      console.log(result);
      if (result.msg === "Congrats you are signed Up.") {
        document.getElementById("signup-container").style.display = "none";
        document.getElementById("signin-container").style.display = "block";
        document.getElementById("response-message").innerHTML =
          result.body || "Signed Up Successfully, Please sign in.!";
        isSigningUp = false;
      } else {
        document.getElementById("response-message").innerHTML =
          "SignUp failed!!";
        isSigningUp = false;
      }
    } catch (error) {
      console.log(error);
      document.getElementById("response-message").innerHTML =
        "Some error occured. Try again after sometime";
      isSigningUp = false;
    }
  });

// signing in
document
  .getElementById("signin-container")
  .addEventListener("submit", async (e) => {
    e.preventDefault();
    if (isSigningIn) return;
    isSigningIn = true;

    const email = document.getElementById("signin-username").value;
    const password = document.getElementById("signin-password").value;

    try {
      const response = await fetch("http://localhost:3000/user/signin", {
        method: "POST",
        body: JSON.stringify({ email: email, password: password }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const result = await response.json();

      if (result.token) {
        localStorage.setItem("token", result.token);
        document.getElementById("signin-container").style.display = "none";
        document.getElementById("todo-container").style.display = "block";
        document.getElementById("response-message").innerHTML =
          "<a href='#' id='logout-link'>Logout</a>";
        document.getElementById("signin-password").value = "";

        loadTodos();

        document
          .getElementById("logout-link")
          .addEventListener("click", async (e) => {
            e.preventDefault();
            localStorage.removeItem("token");
            document.getElementById("todo-container").style.display = "none";
            document.getElementById("signin-container").style.display = "block";
            document.getElementById("response-message").innerHTML = "";
          });
      } else {
        document.getElementById("response-message").innerHTML =
          result.msg || "Signin failed";
      }
      isSigningIn = false;
    } catch (error) {
      console.log(error);
      document.getElementById("response-message").innerHTML =
        "Some error occured";
      isSigningIn = false;
    }
  });

//adding todos
document
  .getElementById("todo-container")
  .addEventListener("submit", async (e) => {
    e.preventDefault();
    if (isAddingTodo) return;
    isAddingTodo = true;
    const title = document.getElementById("todo-input").value;
    console.log(JSON.stringify({ title: title }));
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:3000/todo/addToDo", {
        headers: {
          token: token,
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({ title: title }),
      });

      const result = await response.json();
      if (result.msg === "Todo added successfully!") {
        loadTodos();
        document.getElementById("todo-input").value = "";
      } else {
        console.log(result.msg);
      }
      isAddingTodo = false;
    } catch (error) {
      isAddingTodo = false;
      console.error("Error adding todo:", error);
    }
  });

async function loadTodos() {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch("http://localhost:3000/todo", {
      method: "GET",
      headers: { token: token, "Content-Type": "application/json" },
    });
    const { todos } = await response.json();

    const todoListEl = document.getElementById("todo-list");
    todoListEl.innerHTML = "";
    todos.forEach((el) => {
      const listItem = document.createElement("li");
      listItem.textContent = el.title;
      todoListEl.appendChild(listItem);
    });
  } catch (error) {
    console.error("Error loading todos: ", error);
  }
}

document.getElementById("show-signin").addEventListener("click", (e) => {
  e.preventDefault();
  document.getElementById("signup-container").style.display = "none";
  document.getElementById("signin-container").style.display = "block";
});

document.getElementById("show-signup").addEventListener("click", (e) => {
  e.preventDefault();
  document.getElementById("signin-container").style.display = "none";
  document.getElementById("signup-container").style.display = "block";
});
