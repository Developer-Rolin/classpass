document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelectorAll(".selector-btn");
  const tabs = document.querySelectorAll(".sponsor-tab");

  buttons.forEach(btn => {
    btn.addEventListener("click", () => {
      buttons.forEach(b => b.classList.remove("active"));

      btn.classList.add("active");

      tabs.forEach(tab => tab.classList.remove("active"));

      const targetId = btn.getAttribute("data-sponsor");
      document.getElementById(targetId).classList.add("active");
    });
  });
});
