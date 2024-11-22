import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDURiYA4nY9jwrhgz-CmhhPR1IdkE95tBU",
  authDomain: "solutech-fiap.firebaseapp.com",
  databaseURL: "https://solutech-fiap-default-rtdb.firebaseio.com",
  projectId: "solutech-fiap",
  storageBucket: "solutech-fiap.firebasestorage.app",
  messagingSenderId: "449081751827",
  appId: "1:449081751827:web:c3bb0ee812486d51df42e6"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };