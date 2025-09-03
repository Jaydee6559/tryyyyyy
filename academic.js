// Mobile menu functionality
document.addEventListener("DOMContentLoaded", function () {
  const mobileMenuButton = document.getElementById("mobile-menu-button");
  const mobileMenu = document.createElement("div");
  mobileMenu.className = "mobile-menu";
  mobileMenu.innerHTML = `
        <a href="homepage.html">Home</a>
        <a href="homepage.html#about" class="active">About</a>
        <a href="admission.html">Admissions</a>
        <a href="homepage.html#about">Team</a>
        <a href="homepage.html#contact">Contact</a>
      `;
  document.body.appendChild(mobileMenu);

  mobileMenuButton.addEventListener("click", function () {
    mobileMenu.classList.toggle("show");
  });

  // Close mobile menu when clicking outside
  document.addEventListener("click", function (event) {
    if (
      !mobileMenu.contains(event.target) &&
      !mobileMenuButton.contains(event.target)
    ) {
      mobileMenu.classList.remove("show");
    }
  });

  const profileCircle = document.querySelector(".profile-circle");
  if (!profileCircle) return; 
  const user = JSON.parse(localStorage.getItem("loggedInUser "));
  if (user) {
    if (user.profilePicUrl) {
      profileCircle.innerHTML = `<img src="${user.profilePicUrl}" alt="Profile Picture" style="width:100%; height:100%; border-radius:50%;">`;
    } else if (user.fullname) {
      const initials = user.fullname
        .split(" ")
        .map((name) => name[0].toUpperCase())
        .join("");
      profileCircle.textContent = initials;
    }
  } else {
    profileCircle.innerHTML = '<i class="fas fa-user"></i>';
    profileCircle.href = "login.html";
  }
});
