document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("signup-form");

  // Load saved data from localStorage and populate form

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    // Collect form data
    const formData = {
      fullname: form.fullname.value.trim(),
      username: form.username.value.trim(),
      email: form.email.value.trim(),
      phoneNumber: form.phoneNumber.value.trim(),
      password: form.password.value,
      confirmPassword: form.confirmPassword.value,
      gender: form.gender.value || "",
    };

    // Simple validation example: check passwords match
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    // Save data to localStorage
    localStorage.setItem("loginFormData", JSON.stringify(formData));
    console.log("Signup data saved: ", formData);

    alert("Data saved to localStorage!");

    // redirect
    alert("Account created successfully! Redirecting to login page...");
    window.location.href = "login.html";
  });
});
