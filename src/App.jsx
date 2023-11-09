import { useState } from 'react'
import './App.css'
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyAJUl2sV-O9-t9a921-nyGnvTNk3fSuaks",
  authDomain: "formulaq-921f8.firebaseapp.com",
  projectId: "formulaq-921f8",
  storageBucket: "formulaq-921f8.appspot.com",
  messagingSenderId: "1032634804805",
  appId: "1:1032634804805:web:e6bb344ede64355f70512c",
  measurementId: "G-WBG30XEBKC"
};
const app = initializeApp(firebaseConfig);
function App() {
  const [logIn,setLogIn]=useState(false);
  const provider = new GoogleAuthProvider();
  const auth = getAuth();
  const signUp=()=>{
    signInWithPopup(auth, provider)
  .then((result) => {
    const user = result.user;
    console.log(user);
    setLogIn(true);
  }).catch((error) => {
    console.log(error)
  });
  }
  return (
    <>
      {!logIn && 
      <button onClick={signUp} className='bg-blue-600 text-white p-5 m-2'>Sign in with Google</button>}
      {/* <h1 className='text-white bg-blue-900'>Hello</h1> */}
      {
      <div className='border-4 border-sky-500 w-screen h-40'>
        <p>Hello</p>
      </div>}
    </>
  )
}

export default App
