import React from 'react';
import "./styles/ConnectWalletBtn.css";

function ConnectWalletBtn(props) {
  return (
    <button className='btn-1 btn'
      onClick={props.connectWallet}
      > <img className='phantom' src="./phantom.png" alt="" /> Connect Wallet</button>
  )
}

export default ConnectWalletBtn