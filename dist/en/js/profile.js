const reservations = document.getElementById("reservations");
const details = document.getElementById("details-cont");
const check_cont = document.getElementById("check-cont");
let check_form = document.getElementById("check_form");
let visa_cardInp = document.getElementById("visa_card");
let individualsInp = document.getElementById("individuals");
let phoneInp = document.getElementById("phone");

if (!document.cookie.length) {
  location.pathname = "/dist/en/pages/Home.html";
}

{
  let data = [];
  let detailsHotel = [];
  window.onload = async () => {
    const GetReservations = localStorage.getItem("reservations");
    data = JSON.parse(GetReservations);
    detailsHotel = data[0];
    RenderDetails();
    InitValues();
  };
  window.addEventListener("load", () => RenderReservations());

  function RenderReservations() {
    reservations.innerHTML = "";
    const dataArray = data;

    if (dataArray.length) {
      dataArray.forEach((e) => {
        const hotelCard = document.createElement("div");
        hotelCard.id = "hotel_card";
        hotelCard.classList.add(
          "flex",
          "gap-5",
          "outline",
          "outline-1",
          "outline-zinc-700",
          "w-full",
          "h-28",
          "overflow-hidden",
          "rounded-[4px]",
          "cursor-pointer",
          "hover:opacity-80",
          "hover:outline-white",
          "transition-all",
          "text-white"
        );
        hotelCard.setAttribute("onclick", `HotelFocus(${JSON.stringify(e)})`);

        hotelCard.innerHTML = `
          <img class="h-28 w-32 object-cover" loading="lazy" src="${e.img}" alt="Room"/>
          <div>
            <h1 class="text-lg">${e.hotel_name}</h1>
            <h1>${e.description}</h1>
            <div class="flex gap-1 mt-1"> 
              <h1 class="line-through text-zinc-400">${e.last_price}$</h1>
              <h1 class="text-zinc-200">${e.price}$ for ${e.for}</h1>
            </div>
          </div>
        `;

        reservations.appendChild(hotelCard);
      });
    } else {
      details.style.display = "none";
      reservations.innerHTML = "<p>لا توجد نتائج</p>";
    }
  }

  function HotelFocus(d) {
    detailsHotel = d;
    RenderDetails();
  }

  function RenderDetails() {
    details.innerHTML = `
    <div id="details" class="outline outline-1 outline-gray-800 w-full overflow-hidden rounded-[4px]" id="details"><img class="h-96 w-full object-fit-cover object-cover" loading="lazy" src="${detailsHotel.img}" alt="Room"/>
    <div class="px-2">
      <h1 class="text-3xl mt-5">${detailsHotel.hotel_name}</h1>
      <h1 class="text-3xl mt-5">${detailsHotel.description}</h1>
      <div class="flex gap-1 mt-1 text-xl">
        <h1 class="line-through text-zinc-400">${detailsHotel.price}$</h1>
        <h1 class="text-zinc-200">${detailsHotel.last_price}$ For ${detailsHotel.for}</h1>
      </div>
      <h1 class="text-zinc-200">Rate: ${detailsHotel.rate}</h1>
    </div>
    <button id="checkout" class="w-full bg-yellow-700 h-12 mt-10 text-zinc-900 text-lg transition-all hover:text-white">Check Out</button>
  </div>
    `;

    const checkOutBtn = document.getElementById("checkout");
    checkOutBtn.addEventListener("click", () => {
      document.getElementById("details").style.display = "none";
      details.innerHTML = `
      <div class="w-full bg-slate-800 h-full" id="check-cont">
      <form class="flex flex-col gap-6 items-center p-10" id="check_form">
      <div class="flex flex-col gap-2 w-full">
      <label class="text-s capitalize text-[17px]" for="visa_card">Visa Card</label>
      <input class="w-full outline outline-1 outline-[#EDC531] bg-zinc-800 py-1 px-2" id="visa_card" name="visa_card" type="number" required="required"/>
      </div>
      <div class="flex flex-col gap-2 w-full">
      <label class="text-s capitalize text-[17px]" for="individuals">Number of Individuals</label>
      <input class="w-full outline outline-1 outline-[#EDC531] bg-zinc-800 py-1 px-2" id="individuals" name="individuals" type="number" required="required"/>
      </div>
      <div class="flex flex-col gap-2 w-full">
        <label class="text-s capitalize text-[17px]" for="phone">Phone Number</label>
        <input class="w-full outline outline-1 outline-[#EDC531] bg-zinc-800 py-1 px-2" id="phone" name="phone" type="number" required="required"/>
      </div>
      <button class="w-full h-10 bg-[#dbb42c] text-zinc-800 text-lg" id="CheckOut">Submit</button>
      </form>
      </div>`;
      check_form = document.getElementById("check_form");
      visa_cardInp = document.getElementById("visa_card");
      individualsInp = document.getElementById("individuals");
      phoneInp = document.getElementById("phone");

      InitValues();

      check_form.addEventListener("submit", (e) => {
        e.preventDefault();
        const form = new FormData(check_form);
        const visa_card = form.getAll("visa_card");
        const individuals = form.getAll("individuals");
        const phone = form.getAll("phone");

        if (phone.length && individuals.length && visa_card.length) {
          const GetReservations = localStorage.getItem("reservations");
          const data = JSON.parse(GetReservations);
          const newReservations = data.filter((f) => f.id !== detailsHotel.id);
          const encodeNewReservations = JSON.stringify(newReservations);
          localStorage.setItem("reservations", encodeNewReservations);
          RenderDetails();
          alert("Check Out Successfully");
        }
      });

      function InitValues() {
        visa_cardInp.value = GetCookie("visa_card")[0];
        phoneInp.value = GetCookie("phone_number")[0];
      }
    });
  }
}

function GetCookie(name) {
  const cookieArray = document.cookie.split(";").map((cookie) => cookie.trim());
  const dataCookie = cookieArray.find((cookie) => cookie.startsWith("data="));
  const dataString = dataCookie.substring(5);

  const jsonData = JSON.parse(decodeURIComponent(dataString));
  return jsonData[`${name}`];
}
