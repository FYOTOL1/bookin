const reservations = document.getElementById("reservations");

if (!document.cookie.length) {
  location.pathname = "/dist/en/pages/Home.html";
}

{
  window.addEventListener("load", () => RenderReservations());

  function RenderReservations() {
    const GetReservations = localStorage.getItem("reservations");
    if (GetReservations) {
      reservations.innerHTML += `
      <div class="flex flex-row-reverse ms-auto gap-5 bg-slate-700 w-full max-w-[700px] h-32 overflow-hidden rounded-[4px] cursor-pointer transition-all hover:opacity-80">
      <img class="h-full w-40 object-cover" loading="lazy"
      src="https://firebasestorage.googleapis.com/v0/b/hwaidak-hotels-staging.appspot.com/o/Titanic%20Royal%2FPremium%20-%20Family-Standard%20Room%2FPremium%20-%20Family%3AStandard-1.jpeg?alt=media&amp;token=3799f666-c5f8-47d8-8f18-871c95d7b5b0"
      alt="Room" />
      <div dir="rtl">
      <h1 class="text-lg text-white">Premium - Family / Standard</h1>
      <div class="flex gap-1 mt-1">
      <h1 class="line-through text-zinc-400">200$</h1>
      <h1 class="text-zinc-200">159$ For Night</h1>
      </div>
      <h1 class="text-yellow-500">Rate: 4.5</h1>
      </div>
      </div>
    `;
    } else {
      reservations.innerHTML += `<h1 class='text-2xl text-white'>There Is No Reservations</h1>`;
    }
  }
}
