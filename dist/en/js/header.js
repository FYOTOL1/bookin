let profile = document.getElementById("profile");
let loginPopup = document.getElementById("loginPopup");

if (localStorage.getItem("token")?.length) {
  profile.innerHTML = "<a href='/dist/en/pages/Profile.html'>Profile</a>";
} else {
  profile.innerHTML = "<a href='#'>Login</a>";
  profile.addEventListener("click", () => {
    loginPopup.classList.remove("hidden");
    loginPopup.classList.add("flex");
  });
}
