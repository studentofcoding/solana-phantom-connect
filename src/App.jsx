import React,{useEffect,useState} from 'react';
import Logo from "./components/Logo";
import ConnectWalletBtn from "./components/ConnectWalletBtn";
import Connected from "./components/Connected";
// import Footer from "./components/Footer";
import isWhitelisted from "./utils/Whitelisted";
// Import the JSON as a Javascript object first
import wl from './wl.json'; /*NodeJS syntax*/
// Convert the object to a string
// JSON.stringify(wlJson);
// Output will look like this
// "{"key1":"value","key2":"value2"}"
// .env file
// SOME_ENV_VARIABLE={"key1":"value","key2":"value2"}
// Use the same by parsing the string back to object
// const SOME_ENV_VAR = JSON.parse(process.env.SOME_ENV_VARIABLE || {});
import './App.css';

function App() {
  const [walletAddress, setWalletAddress] = useState(null);
  const [whitelisted, setWhitelisted] = useState(false);

  const checkIfWalletIsConnected = async ()=>{
    if(window?.solana?.isPhantom){
      //checks whether solana object is present or not
      console.log(window.solana);
      console.log("Phantom wallet found!");
      const wlJson = JSON.stringify(wl);
      console.log(wlJson);
      // const WL_ENV = JSON.parse(import.meta.env.WL_ADDRESSES || [])
      console.log("This is wl from env", WL_ENV);
      
      //connects to the phantom wallet if it is already authenticated to do so
      const response = await window.solana.connect({ onlyIfTrusted: true });
      setWalletAddress(response.publicKey.toString());
      if (walletAddress) {
        setWhitelisted(isWhitelisted(walletAddress));
        console.log("what is whitelisted", isWhitelisted);
        console.log("what is whitelisted", whitelisted);
      }
    }else{
      alert("Phantom wallet not installed!");
    }
  }
  
  const checkIfWalletIsDisconnected = async ()=>{
    window.solana.disconnect({ onlyIfTrusted: true });
    if(window?.solana?.isPhantom){
      //checks whether solana object is present or not
      console.log(window.solana);
      console.log("Phantom wallet found!");

      //connects to the phantom wallet if it is already authenticated to do so
      const response = await window.solana.disconnect({ onlyIfTrusted: true });
      setWalletAddress(response.publicKey.toString());
      if (walletAddress) {
        setWhitelisted(isWhitelisted(walletAddress));
        console.log("what is whitelisted", isWhitelisted);
        console.log("what is whitelisted", whitelisted);
      }
    }else{
      alert("Phantom wallet not installed!");
    }
  }

  const connectWallet = async ()=>{
    const {solana} = window;

    if(solana){
      await solana.connect();
      checkIfWalletIsConnected();
    }
  }
  
  const disconnectWallet = async ()=>{
    window.disconnect()
    // const {solana} = window;

    // if(solana){
    //   await solana.disconnect();
    //   checkIfWalletIsConnected();
    // }
  }
  
  useEffect(() => {
    console.log("this is the address", walletAddress);
    if (walletAddress) {
        setWhitelisted(isWhitelisted(walletAddress));
        console.log("what is whitelisted", isWhitelisted);
        console.log("what is whitelisted", whitelisted);
      }
  }, [walletAddress]);

  useEffect(()=>{
    const onLoad = async ()=>{
      await checkIfWalletIsConnected();
    };

    window.addEventListener('load',onLoad);
    return ()=> window.removeEventListener('load',onLoad);
  },[]);


  return (
    <div>
      {/* Logo which is at top left */}
      <div className="top-left header">
      <Logo/>
      <p className='title'>Wallet Checker</p>
      </div>

      {/* Intro */}
      <div className="container">
      <h3>Introduction</h3>
      <p> This DApp is designed to DEMO if your wallet is included into some NFT collection, if it's included you'll get `Wallet included in the collection!` and `Sorry wallet are not included into the collection` if it's not included</p>
      <p> If you want to include your own Phantom wallet, you can chat me on upwork</p>
      <br />

      {/* Connect Wallet Button */}
      {walletAddress==null?
        <ConnectWalletBtn 
        connectWallet={connectWallet} 
        /> :
        <>
          {whitelisted===true?
            <>
              <Connected
              connected={walletAddress} 
              />
              <p>
              Wallet included in the collection!
              </p>
            </>
            :
            <>
              <Connected
              connected={walletAddress} 
              />
              <p>
              Sorry wallet are not included into the collection!
              </p>
            </>
          }
        </>
      }
      

      </div>

      {/* <Footer/> */}

    </div>
  )
}

export default App