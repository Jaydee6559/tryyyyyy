document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("login-form");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const email = form.email.value.trim();
    const password = form.password.value;

    // Retrieve saved user data from localStorage (adjust key if needed)
    const savedUser = JSON.parse(localStorage.getItem("loginFormData"));

    if (!savedUser ) {
      alert("No account found. Please sign up first.");
      return;
    }

    // Simple validation: check email and password match saved data
    if (savedUser .email === email && savedUser .password === password) {
      // Save logged-in user info (without password)
      const loggedInUser = {
        fullname: savedUser .fullname,
        email: savedUser .email,
        username: savedUser .username,
        profilePicUrl: savedUser .profilePicUrl || null
      };

      localStorage.setItem("loggedInUser", JSON.stringify(loggedInUser));

      alert("Login successful! Redirecting...");

      window.location.href = "index.html"; // Change to your homepage URL
    } else {
      alert("Invalid email or password.");
    }
  });
});

