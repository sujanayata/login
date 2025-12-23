

const API_URL = "https://login-4-p0gr.onrender.com/api";

function showMessage(text, success = false) {
  const msg = document.getElementById("message");
  msg.innerText = text;
  msg.style.color = success ? "green" : "red";
}

function setLoading(isLoading, text) {
  const btn = document.getElementById("submitBtn");
  if (!btn) return;

  if (isLoading) {
    btn.disabled = true;
    btn.innerHTML = `<span class="spinner"></span>`;
  } else {
    btn.disabled = false;
    btn.innerText = text;
  }
}

function togglePassword() {
  const pwd = document.getElementById("password");
  pwd.type = pwd.type === "password" ? "text" : "password";
}

/* ================= LOGIN ================= */
function login() {
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  if (!email || !password) {
    showMessage("All fields are required");
    return;
  }

  setLoading(true, "Login");

  fetch(`${API_URL}/login/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  })
  .then(res => {
    if (!res.ok) throw new Error();
    return res.json();
  })
  .then(() => {
    localStorage.setItem("loggedIn", "true");
    window.location.href = "index.html";
  })
  .catch(() => showMessage("Invalid email or password"))
  .finally(() => setLoading(false, "Login"));
}

/* ================= SIGNUP ================= */
function signup() {
  const username = document.getElementById("username").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  if (!username || !email || !password) {
    showMessage("All fields are required");
    return;
  }

  if (password.length < 6) {
    showMessage("Password must be at least 6 characters");
    return;
  }

  setLoading(true, "Signup");

  fetch(`${API_URL}/signup/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, email, password })
  })
  .then(res => res.json().then(data => ({ ok: res.ok, data })))
  .then(result => {
    if (result.ok) {
      alert("Signup successful. Please login.");
      window.location.href = "login.html";
    } else {
      showMessage(result.data.message);
    }
  })
  .catch(() => showMessage("Server error"))
  .finally(() => setLoading(false, "Signup"));
}
