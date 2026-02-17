document.addEventListener("DOMContentLoaded", () => {
  const selectContainer = document.getElementById("experienceSelectContainer");
  const customSelect = document.getElementById("customSelect");
  const options = document.querySelectorAll(".option");
  const hiddenInput = document.getElementById("experience");
  const selectedText = customSelect.querySelector(".selected-text");
  const form = document.getElementById("signupForm");
  const experienceInput = document.getElementById("experience");

  customSelect.addEventListener("click", e => {
    selectContainer.classList.toggle("active");
    e.stopPropagation();
  });

  options.forEach(option => {
    option.addEventListener("click", () => {
      const value = option.getAttribute("data-value");
      const text = option.textContent;

      selectedText.textContent = text;
      hiddenInput.value = value;

      selectContainer.classList.add("has-value");

      selectContainer.classList.contains("has-value")
        ? selectContainer.classList.remove("invalid")
        : selectContainer.classList.add("invalid");

      options.forEach(opt => opt.classList.remove("selected"));
      option.classList.add("selected");

      selectContainer.classList.remove("active");
    });
  });

  document.addEventListener("click", () => {
    selectContainer.classList.remove("active");
  });

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    form.classList.add("was-validated");

    const isExperienceValid = !!experienceInput.value;

    if (!isExperienceValid) {
      selectContainer.classList.add("invalid");
    }

    if (!form.checkValidity() || !isExperienceValid) {
      return;
    }

    const data = Object.fromEntries(new FormData(form));
    console.log("Sent Data:", data);
    location.pathname = "/thank-you.html";
  });
});
