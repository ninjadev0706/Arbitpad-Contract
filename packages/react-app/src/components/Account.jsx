import { Button } from "antd";
import React, { useState } from "react";
import { parseEther } from "@ethersproject/units";
import { ETH_VAL } from "../constants";
import './Account.css';

/*
  ~ What it does? ~

  Displays an Address, Balance, and Wallet as one Account component,
  also allows users to log in to existing accounts and log out

  ~ How can I use? ~

  <Account
    address={address}
    localProvider={localProvider}
    userProvider={userProvider}
    mainnetProvider={mainnetProvider}
    price={price}
    web3Modal={web3Modal}
    loadWeb3Modal={loadWeb3Modal}
    logoutOfWeb3Modal={logoutOfWeb3Modal}
    blockExplorer={blockExplorer}
  />

  ~ Features ~

  - Provide address={address} and get balance corresponding to the given address
  - Provide localProvider={localProvider} to access balance on local network
  - Provide userProvider={userProvider} to display a wallet
  - Provide mainnetProvider={mainnetProvider} and your address will be replaced by ENS name
              (ex. "0xa870" => "user.eth")
  - Provide price={price} of ether and get your balance converted to dollars
  - Provide web3Modal={web3Modal}, loadWeb3Modal={loadWeb3Modal}, logoutOfWeb3Modal={logoutOfWeb3Modal}
              to be able to log in/log out to/from existing accounts
  - Provide blockExplorer={blockExplorer}, click on address and get the link
              (ex. by default "https://etherscan.io/" or for xdai "https://blockscout.com/poa/xdai/")
*/

export default function Account({
  address,
  userSigner,
  localProvider,
  mainnetProvider,
  price,
  minimized,
  web3Modal,
  loadWeb3Modal,
  logoutOfWeb3Modal,
  blockExplorer,
  contract, signer, remainTokenCount, mintCount,remainMintCount,
  notify
}) {

  const [amount, setAmount] = useState(ETH_VAL);
  const [minting, setMinting] = useState(false);
  const [currentAccount, setCurrentAccount] = useState(null);

  const mintNftHandler = async () => {
    
    if(remainMintCount < 1) return;
    setMinting(true);
    try {
      const mintFunction = contract.connect(signer)["mint"];
      const hash = await mintFunction(address, mintCount, {
        value: parseEther((amount * mintCount).toString()),
      });
      const result = await hash.wait();
      console.log(result);
      setMinting(false);
      notify(mintCount + " NFT(s) minted.");
    } catch (e) {
      var errormsg = e.error.message ? e.error.message : "Mint Failed.";
      if(errormsg.indexOf("insufficient funds") != -1)          errormsg = "Insufficient funds";
      if(errormsg.indexOf("whitelisted") != -1)                 errormsg = "User is not whitelisted";  
      if(errormsg.indexOf("Mint is paused") != -1)              errormsg = "Mint is paused";
      if(errormsg.indexOf("Recipient should be present") != -1) errormsg = "Recipient should be present";
      if(errormsg.indexOf("Need to mint at least 1 NFT") != -1) errormsg = "Need to mint at least 1 NFT";
      if(errormsg.indexOf("Royalty value should be positive") != -1)      errormsg = "Royalty value should be positive";
      if(errormsg.indexOf("Max mint amount per session exceeded") != -1)  errormsg = "Max mint amount per session exceeded";
      notify(errormsg);
      setMinting(false);
      console.log(e.error.message);
    }
  };

  const modalButtons = [];
  if (web3Modal) {
    // console.log(web3Modal.cachedProvider)
    if (web3Modal.cachedProvider) {
      modalButtons.push(
        <Button
          key="logoutbutton"
          style={{ 
            verticalAlign: "top",
            width: "300px"
          }}
          onClick={mintNftHandler}
          className="connect_status light"
        >
          {minting? (<>Minting ...</>) : (<>Mint</>) }
        </Button>,
      );
    } else {
      modalButtons.push(
        <Button
          key="loginbutton"
          style={{ verticalAlign: "top", width: "300px" }}
          /* type={minimized ? "default" : "primary"}     too many people just defaulting to MM and having a bad time */
          onClick={loadWeb3Modal}
          className="connect_status dark"
        >
          Connect wallet
        </Button>,
      );
    }
  }

  return (
    <div>
      {modalButtons}
    </div>
  );
}
