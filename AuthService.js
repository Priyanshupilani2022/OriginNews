/* eslint-disable no-useless-catch */
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword as signIn, createUserWithEmailAndPassword as createUser, signOut as logout } from "firebase/auth";
import firebaseConfig from "./firebaseConfig";

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Custom authentication function: Login with email and password
async function loginWithEmailAndPassword(email, password) {
  try {
    const userCredential = await signIn(auth, email, password);
    return userCredential.user;
  } catch (error) {
    throw error;
  }
}

// Custom authentication function: Create user with email and password
async function createUserWithEmailAndPassword(email, password) {
  try {
    const userCredential = await createUser(auth, email, password);
    return userCredential.user;
  } catch (error) {
    throw error;
  }
}

// Custom function: Logout the current user
async function logoutUser() {
  try {
    await logout(auth);
  } catch (error) {
    throw error;
  }
}

// More functions can be added as needed...

export { auth, createUserWithEmailAndPassword, loginWithEmailAndPassword, logoutUser };
