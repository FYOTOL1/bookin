const reservations = document.getElementById("reservations");

if (!document.cookie.length) {
  location.pathname = "/dist/en/pages/Home.html";
}

{
  window.addEventListener("load", () => RenderReservations());

  function RenderReservations() {
    const GetReservations = localStorage.getItem("reservations");
    if (GetReservations.length) {
      const data = JSON.parse(GetReservations);
      data.map((e) => {
        reservations.innerHTML += `
      <div class="flex flex-row-reverse ms-auto gap-5 bg-slate-700 w-full max-w-[700px] h-32 overflow-hidden rounded-[4px] cursor-pointer transition-all hover:opacity-80">
      <img class="h-full w-40 object-cover" loading="lazy"
      src="${e.img}"
      alt="Room" />
      <div dir="rtl">
      <h1 class="text-lg text-white">${e.hotel_name}</h1>
      <div class="flex gap-1 mt-1">
      <h1 class="line-through text-zinc-400">${e.last_price}$</h1>
      <h1 class="text-zinc-200">${e.price}$ For ${e.type}</h1>
      </div>
      <h1 class="text-yellow-500">Rate: ${e.rate}</h1>
      </div>
      </div>
    `;
      });
    } else {
      reservations.innerHTML += `<h1 class='text-2xl text-white'>There Is No Reservations</h1>`;
    }
  }
}
