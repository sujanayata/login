function signup() {
    fetch("http://127.0.0.1:8000/api/signup/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            username: username.value,
            email: email.value,
            password: password.value
        })
    })
    .then(res => res.json())
    .then(() => window.location.href = "login.html");
}

function login() {
    fetch("http://127.0.0.1:8000/api/login/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            email: email.value,
            password: password.value
        })
    })
    .then(res => {
        if(res.ok) {
            window.location.href = "home.html";
        } else {
            alert("Invalid login");
        }
    });
}
