const search = document.getElementById("search");

search?.addEventListener("keyup", (e) => {
  console.log(e?.target?.value);
});
