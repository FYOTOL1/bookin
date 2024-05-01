if (
  !localStorage.getItem("token")?.length &&
  location.pathname == "/dist/en/pages/Profile.html"
) {
  location.pathname = "/dist/en/pages/Home.html";
}
