import React,{useEffect,useState} from 'react';
import Logo from "./components/Logo";
import ConnectWalletBtn from "./components/ConnectWalletBtn";
import Connected from "./components/Connected";
import Footer from "./components/Footer";
import './App.css';

function App() {
  const [walletAddress, setWalletAddress] = useState(null);

  const checkIfWalletIsConnected = async ()=>{
    if(window?.solana?.isPhantom){
      //checks whether solana object is present or not
      console.log(window.solana);
      console.log("Phantom wallet found!");

      //connects to the phantom wallet if it is already authenticated to do so
      const response = await window.solana.connect({ onlyIfTrusted: true });
      setWalletAddress(response.publicKey.toString());
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
      <p className='title'>Solana Wallet Connect</p>
      </div>

      {/* Intro */}
      <div className="container">
      <h3>Introduction</h3>
      <p> Our DApp is designed to connect to the Solana blockchain and serve as an authenticator for your wallet. With our DApp, you can easily and securely connect your wallet to the Solana chain. </p>
      <p>

To get started, simply click the "Connect Wallet" button. This will allow you to choose the wallet you want to use and establish a connection to the Solana chain.
      Checkout source code of this website at <a href="https://github.com/anukulpandey/solana-wallet-connect">anukul's repository</a> </p>
      <br />

      {/* Connect Wallet Button */}
      {walletAddress==null?
    <ConnectWalletBtn 
    connectWallet={connectWallet} 
    />:
    <>
     <Connected
    connected={walletAddress} 
    />
    </>
    }
      

      </div>

      <Footer/>

    </div>
  )
}

export default App