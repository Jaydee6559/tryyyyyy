document.addEventListener('DOMContentLoaded', () => {

    const savedUser = JSON.parse(localStorage.getItem("loginFormData")); // or your users array
    if (!savedUser) {
      alert("You must have an account before registering enrollment.");
      window.location.href = "signup.html"; // or login.html
    }

  const form = document.getElementById("registrationForm");
  const steps = Array.from(form.querySelectorAll(".form-step"));
  const progressItems = document.querySelectorAll(".progressbar li");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");
  let currentStep = 0;

  function showStep(step) {
    steps.forEach((s, i) => {
      s.classList.toggle("active", i === step);
      progressItems[i].classList.toggle("active", i <= step);
    });
    prevBtn.disabled = step === 0;
    nextBtn.textContent = step === steps.length - 1 ? "Submit" : "Next";
  }

  function validateStep(step) {
    const inputs = steps[step].querySelectorAll("input, select");
    let valid = true;
    for (let input of inputs) {
      if (input.hasAttribute("required")) {
        input.classList.remove("invalid"); // reset
        if (input.type === "file") {
          if (!input.files || input.files.length === 0) {
            input.classList.add("invalid");
            input.focus();
            alert(
              `Please upload the required file: ${input.previousElementSibling.textContent}`
            );
            valid = false;
            break;
          }
        } else if (input.type === "checkbox") {
          if (!input.checked) {
            input.classList.add("invalid");
            input.focus();
            alert(
              `Please acknowledge: ${input.nextElementSibling.textContent}`
            );
            valid = false;
            break;
          }
        } else if (!input.value.trim()) {
          input.classList.add("invalid");
          input.focus();
          alert(
            `Please fill out the required field: ${input.previousElementSibling.textContent}`
          );
          valid = false;
          break;
        }
      }
    }
    return valid;
  }

  // birthday calculation section
  const birthdayInput = form.querySelector("#birthday");
  const ageInput = form.querySelector("#age");

  birthdayInput.addEventListener("change", () => {
    const birthDate = new Date(birthdayInput.value);
    if (birthDate.toString() === "Invalid Date") {
      ageInput.value = "";
      return;
    }
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();

    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    ageInput.value = age >= 0 ? age : "";
  });

  nextBtn.addEventListener("click", () => {
    if (!validateStep(currentStep)) return;

    if (currentStep === steps.length - 1) {
      // Submit form
      alert("Form submitted! (Implement actual submission logic here)");
      form.reset();
      currentStep = 0;
      showStep(currentStep);
      return;
    }
    currentStep++;
    showStep(currentStep);
  });

  prevBtn.addEventListener("click", () => {
    if (currentStep > 0) {
      currentStep--;
      showStep(currentStep);
    }
  });

  // options for school year section
  const schoolYearSelect = form.querySelector("#schoolyear");
  function populateSchoolYears() {
    const currentYear = new Date().getFullYear();
    for (let i = 0; i < 5; i++) {
      const startYear = currentYear + i;
      const endYear = startYear + 1;
      const option = document.createElement("option");
      option.value = `${startYear}-${endYear}`;
      option.textContent = `${startYear}-${endYear}`;
      schoolYearSelect.appendChild(option);
    }
  }
  populateSchoolYears();

  // back to homepage button listener
  const backHomeBtn = document.getElementById("backHomeBtn");
  backHomeBtn.addEventListener("click", () => {
    window.location.href = "index.html";
  });

  // Initialize
  showStep(currentStep);
})();

