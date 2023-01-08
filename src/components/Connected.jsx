import React from 'react';
import "./styles/ConnectWalletBtn.css";

function Connected(props) {
  return (
    <button className='btn-1 btn'
      > <img className='phantom' src="./phantom.png" alt="" />{props.connected}</button>
  )
}

export default Connected