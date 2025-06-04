// darkmode.js
document.getElementById(\"toggleDark\").addEventListener(\"click\", () => {
  document.body.classList.toggle(\"dark-mode\");
  localStorage.setItem(\"dark\", document.body.classList.contains(\"dark-mode\"));
});

window.addEventListener(\"load\", () => {
  if (localStorage.getItem(\"dark\") === \"true\") {
    document.body.classList.add(\"dark-mode\");
  }
});
