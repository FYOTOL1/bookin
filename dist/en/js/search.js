const searchForm = document.getElementById("search");
const hotels_cont = document.getElementById("hotels-cont");
const details = document.getElementById("details");
const hotel_card = document.getElementById("hotel_card");

let data = [];
let filter = [];
let detailsHotel = {};

function GetHotels() {
  data = [
    {
      id: 1,
      hotel_name: "F1",
      description: "Good Hotel",
      last_price: 123,
      price: 20,
      for: "Night",
      quantity: 2,
      type: "room",
      rate: 4.5,
      location: "12/133-423/street",
      img: "https://i.pinimg.com/564x/e6/4c/2c/e64c2ce60bc30ce4d9854f69b6cc40c8.jpg",
    },
    {
      id: 2,
      hotel_name: "F2",
      description: "Good Room",
      last_price: 1223,
      price: 50,
      for: "Night",
      quantity: 2,
      type: "room",
      rate: 1,
      location: "12/133-423/street",
      img: "https://i.pinimg.com/564x/8e/06/a6/8e06a606d7d0bf04ea8e3b22e773b505.jpg",
    },
    {
      id: 3,
      hotel_name: "F3",
      description: "Perfect Hotel",
      last_price: 123,
      price: 20,
      for: "Night",
      quantity: 2,
      type: "room",
      rate: 2.5,
      location: "12/133-423/street",
      img: "https://i.pinimg.com/736x/67/2d/e4/672de4b6675d01a81309b0ec827536ff.jpg",
    },
    {
      id: 4,
      hotel_name: "F4",
      description: "Good Room",
      last_price: 123,
      price: 20,
      for: "Night",
      quantity: 2,
      type: "room",
      rate: 4,
      location: "12/133-423/street",
      img: "https://i.pinimg.com/564x/92/58/84/9258843b72f5b8e729724709f30dc3bf.jpg",
    },
  ];
  console.log(data);
  RenderHotels();
}

async function GetHotel(name, type, price, rate) {
  if (name?.length) {
    filter = data.filter(
      (f) =>
        f.hotel_name == name &&
        f.type == type &&
        f.price <= price &&
        f.rate == rate
    );
    RenderHotels();
  }
}

window.onload = async () => {
  await GetHotels();
  detailsHotel = data[0];
  RenderDetails();
};

searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = new FormData(searchForm);
  const name = formData.getAll("name");
  const type = formData.getAll("type");
  const price = formData.getAll("price");
  const rate = formData.getAll("rate");
  GetHotel(name, type, price, rate);
});

function HotelFocus(d) {
  detailsHotel = d;
  RenderDetails();
}

function RenderHotels() {
  hotels_cont.innerHTML = "";
  const dataArray = filter.length ? filter : data;

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
        "transition-all"
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

      hotels_cont.appendChild(hotelCard);
    });
  } else {
    hotels_cont.innerHTML = "<p>لا توجد نتائج</p>";
  }
}

function RenderDetails() {
  details.innerHTML = `
  <img class="h-96 w-full object-fit-cover object-cover loading="lazy""
  src="${detailsHotel.img}"
  alt="Room" />
<div class="px-2">
  <h1 class="text-3xl mt-5">${detailsHotel.hotel_name}</h1>
  <h1 class="text-xl mt-5">${detailsHotel.description}</h1>
  <div class="flex gap-1 mt-1 text-xl">
    <h1 class="line-through text-zinc-400">${detailsHotel.last_price}$</h1>
    <h1 class="text-zinc-200">${detailsHotel.price}$ For ${detailsHotel.for}</h1>
    </div>
    <h2 class="text-yellow-500">Rate: ${detailsHotel.rate}</h2>
</div>
<button id='checkIn' class="w-full bg-yellow-700 h-12 mt-10 text-zinc-900 text-lg transition-all hover:text-white">Check In</button>
  `;

  const checkInButton = document.getElementById("checkIn");
  checkInButton.addEventListener("click", () => {
    if (document.cookie) {
      CheckIn();
    } else {
      alert("Please Login First or Need To Have A Visa Card");
    }
  });
}

function CheckIn() {
  const getReservations = localStorage.getItem("reservations");
  if (getReservations) {
    const reservations = JSON.parse(getReservations);
    const checkIsset = reservations.filter((f) => f.id == detailsHotel.id);
    if (checkIsset.length) {
      alert("You Already Have This Reservation");
      return;
    }
    reservations.push(detailsHotel);
    localStorage.setItem("reservations", JSON.stringify(reservations));
    alert("done successfully");
  } else {
    const reservations = [];
    reservations.push(detailsHotel);
    localStorage.setItem("reservations", JSON.stringify(reservations));
    alert("done successfully");
  }
}

function GetCookie(name) {
  const cookieArray = document.cookie.split(";").map((cookie) => cookie.trim());
  const dataCookie = cookieArray.find((cookie) => cookie.startsWith("data="));
  const dataString = dataCookie.substring(5);

  const jsonData = JSON.parse(decodeURIComponent(dataString));
  return jsonData[`${name}`];
}
