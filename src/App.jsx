import { useEffect, useState } from 'react'
import './App.css'
import { getAuth, signInWithPopup, GoogleAuthProvider,signOut } from "firebase/auth";
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
  const [currentTime, setCurrentTime] = useState(new Date());
  const [lines,setLines]=useState('');
  const [design,setDesign]=useState([]);
  const provider = new GoogleAuthProvider();
  const auth = getAuth(app);
  // const date=new Date();
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
  const logOut=()=>{
    setLogIn(false)
    setUserDetail({})
    signOut(auth).then(() => {
      setLogIn(false)
      setUserDetail({})
    }).catch((error) => {
      // An error happened.
      console.log(error);
    });
  }
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(intervalId);
  },[]);
  const handleInputChange = (event) => {
    const inputValue = event.target.value;
    setLines(inputValue);
  };
  const getPattern=()=>{
    const pattern=[];
    for(let i=1;i<=parseInt(lines,10)/2;i++){
      let input='';
      let spaces=' '.repeat(parseInt(lines,10)/2-i+1);
      let inputString=spaces+input;
      // let inputString='';
      let question='FORMULAQSOLUTIONS';
      // for(let k=1;k<=Math.floor(parseInt(lines,10)/2)-i+1;k++){
      //   inputString+='  ';
      // }
      let questionIndex=i-1;
      for(let j=1;j<=(2*i)-1;j++){
        if(questionIndex==question.length){
          questionIndex=0;
        }
        inputString+=question[questionIndex];
        questionIndex++;
      }
      pattern.push(inputString);
      // console.log(inputString);
    }
    let nextPart;
    {
      let inputString='';
      let questionIndex=Math.floor(parseInt(lines,10)/2);
      let question='FORMULAQSOLUTIONS';
      let limit=Math.floor(parseInt(lines,10)/2);
      for(let j=1;j<=2*limit+1;j++){
        if(questionIndex==question.length){
          questionIndex=0;
        }
        inputString+=question[questionIndex];
        questionIndex++;
      }
      pattern.push(inputString);
      // console.log(inputString);
      nextPart=inputString;
    }
    for(let i=1;i<=parseInt(lines,10)/2;i++){
      let input='';
      let spaces=' '.repeat(i);
      let inputString=spaces+input;
      let totalLines=Math.floor(parseInt(lines,10)/2)
      for(let j=i;j<=2*totalLines-i;j++){
        inputString+=nextPart[j];
      }
      pattern.push(inputString);
      // console.log(inputString);
    }
    setDesign(pattern);
  }
  return (
    <>
      {!logIn && 
      <button onClick={signUp} className='bg-blue-600 text-white p-5 m-2'>Sign in with Google</button>}
      {logIn==true && <div className='border-4 border-gray-600 w-screen h-fit'>
        <img src={`${userDetail.photoURL}`}></img>
        <p>Hello {userDetail.displayName} <span className='text-blue-500 cursor-pointer' onClick={logOut}>[Sign Out]</span></p>
        <p>You are signed in with the email {userDetail.email}</p>
        <p>{currentTime.toLocaleTimeString()}</p>
        <label>
        Enter an integer from 1 to 100:
        <input
          className='border'
          type="text"
          value={lines}
          onChange={handleInputChange}
        />
        </label>
        <button className='bg-blue-600 text-white p-2 m-1 block' onClick={getPattern}>Click to get the pattern</button>
        <div className='bg-black text-white'>
        {design.length!=0 && 
        design.map((item) => (
          <div className='whitespace-pre'><pre>{item}</pre></div>
        ))}
        </div>
      </div>}
    </>
  )
}

export default App
