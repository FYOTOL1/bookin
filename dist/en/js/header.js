let profile = document.getElementById("profile");
let loginPopup = document.getElementById("loginPopup");

let headerList = document.getElementById("HeaderList");
let List = document.getElementById("List");
let avatar = document.getElementById("avatar");

if (document.cookie.length) {
  profile.classList.add("hidden");
  headerList.classList.remove("hidden");
  loginPopup.classList.add("hidden");
  avatar.src = getCookie("photo");
} else {
  profile.innerHTML = "<a href='#'>Login</a>";
  profile.addEventListener("click", () => {
    loginPopup.classList.remove("hidden");
    loginPopup.classList.add("flex");
  });
}

let active = false;
headerList.addEventListener("click", () => {
  active = !active;
  if (active == true) {
    List.classList.add("flex");
    List.classList.remove("hidden");
  } else {
    List.classList.remove("flex");
    List.classList.add("hidden");
  }
});

function Logout() {
  const exp = new Date();
  exp.setTime(exp.getTime() - 1);
  document.cookie = "data=''; expires=" + exp.toUTCString() + "; path='/';";
  window.location.reload();
}

function getCookie(name) {
  const cookieArray = document.cookie.split(";").map((cookie) => cookie.trim());
  const dataCookie = cookieArray.find((cookie) => cookie.startsWith("data="));
  const dataString = dataCookie.substring(5);

  const jsonData = JSON.parse(decodeURIComponent(dataString));
  return jsonData[`${name}`];
}
