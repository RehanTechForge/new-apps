const button = document.querySelector(".button");
const hiddenDiv = document.querySelector(".hidden");
button?.addEventListener("click", () => {
  if (button.innerHTML === "Click To Show More Tools") {
    hiddenDiv?.classList.remove("hidden");
    button.innerHTML = "Click To Show Hide Tools";
  } else {
    hiddenDiv?.classList.add("hidden");
    button.innerHTML = "Click To Show More Tools";
  }
});
