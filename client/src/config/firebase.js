// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB_UHYdTWmpjinz4_1zSKzA88JQ-xC_vsE",
  authDomain: "filedatabasemanagement.firebaseapp.com",
  projectId: "filedatabasemanagement",
  storageBucket: "filedatabasemanagement.appspot.com",
  messagingSenderId: "668119104734",
  appId: "1:668119104734:web:29a682fd8dcc20a1ed564f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage=getStorage(app);