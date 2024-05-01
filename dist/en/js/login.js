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

googleLoginBtn.addEventListener("click", () => {
  signInWithPopup(auth, provider)
    .then((res) => {
      const credential = GoogleAuthProvider.credentialFromResult(res);
      const user = res.user;
      StorageUser(user.displayName, user.photoURL, credential.accessToken);
      window.location.reload();
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });
});

function StorageUser(username, avatar, token) {
  localStorage.setItem("username", username);
  localStorage.setItem("avatar", avatar);
  localStorage.setItem("token", token);
}
