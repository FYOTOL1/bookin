import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
} from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-analytics.js";

const firebaseConfig = {
  apiKey: "AIzaSyAJ8uXQsJtjmOawrbK5hD4bYIF1txsWIOs",
  authDomain: "encoded-might-404314.firebaseapp.com",
  projectId: "encoded-might-404314",
  storageBucket: "encoded-might-404314.appspot.com",
  messagingSenderId: "924233511706",
  appId: "1:924233511706:web:4d09ba306788d6994ab2a3",
  measurementId: "G-TBV89D5CZY",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const provider = new GoogleAuthProvider();
const analytics = getAnalytics(app);

const googleLoginBtn = document.getElementById("googleAuth");
const signupForm = document.getElementById("signup-form");
let photo = "";

googleLoginBtn.addEventListener("click", () => {
  signInWithPopup(auth, provider)
    .then((res) => {
      const credential = GoogleAuthProvider.credentialFromResult(res);
      const user = res.user;
      StorageUser(user.email);
      googleLoginBtn.classList.remove("flex");
      googleLoginBtn.classList.add("hidden");
      signupForm.classList.remove("hidden");
      signupForm.classList.add("flex");
      photo = user.photoURL;
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });
});

signupForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = new FormData(signupForm);
  const visa_card = formData.getAll("visa-card");
  const phone_number = formData.getAll("phone-number");
  const country = formData.getAll("country");
  const age = formData.getAll("age");
  SaveCookie({ visa_card, phone_number, country, age, photo });
});

function SaveCookie(data) {
  const Data = JSON.stringify(data);
  const date = new Date();
  date.setTime(date.getTime() + 1000 * 60 * 60 * 24 * 365);
  document.cookie = "data=" + Data + "; path='/'; expires=" + date + ";";
  location.reload();
}

function StorageUser(data) {
  let emails = localStorage.getItem("emails")
    ? JSON.parse(localStorage.getItem("emails"))
    : [];
  emails = emails.concat(data);
  const jsonData = JSON.stringify(emails);
  localStorage.setItem("emails", jsonData);
}
