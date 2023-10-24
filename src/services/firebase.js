import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC01fXy88McKCgQKiiYno6Hf6KxwT7yUMU",
  authDomain: "poshbo-hotel-booking.firebaseapp.com",
  projectId: "poshbo-hotel-booking",
  storageBucket: "poshbo-hotel-booking.appspot.com",
  messagingSenderId: "178933521749",
  appId: "1:178933521749:web:a574b93fabe2fc82d523dc"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;