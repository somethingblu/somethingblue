let theme = document.querySelector("#theme-button");

export const toggleDarkMode = () => {
  document.body.classList.toggle("dark-mode");
  console.log("clicked");
};

theme.addEventListener("click", toggleDarkMode);