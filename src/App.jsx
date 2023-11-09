import { useEffect, useState } from 'react'
import './App.css'
import { getAuth, signInWithPopup, GoogleAuthProvider,onAuthStateChanged } from "firebase/auth";
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
  const [userDetail,setUserDetail]=useState({});
  const provider = new GoogleAuthProvider();
  const auth = getAuth();
  const signUp=()=>{
    signInWithPopup(auth, provider)
  .then((result) => {
    const {displayName,email,photoURL} = result.user;
    console.log(result.user);
    setUserDetail({displayName,email,photoURL});
    setLogIn(true);
  }).catch((error) => {
    console.log(error)
  });
  }
  const signOut=()=>{
    signOut(auth).then(() => {
      setLogIn(false)
      setUserDetail({})
    }).catch((error) => {
      // An error happened.
      console.log(error);
    });
  }
  useEffect(()=>{
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { displayName, email, photoURL } = user;
        setUserDetail({ displayName, email, photoURL });
        setLogIn(true);
      }else{
        setLogIn(false);
      }
    });

    return () => unsubscribe();
  },[])
  return (
    <>
      {!logIn && 
      <button onClick={signUp} className='bg-blue-600 text-white p-5 m-2'>Sign in with Google</button>}
      {logIn==true && <div className='border-4 border-gray-600 w-screen h-60'>
        <img src={`${userDetail.photoURL}`}></img>
        <p>Hello {userDetail.displayName} <span className='text-blue-500 cursor-pointer' onClick={signOut}>[Sign Out]</span></p>
        <p>You are signed in with the email {userDetail.email}</p>
      </div>}
    </>
  )
}

export default App
