import React, { useState } from "react";
import { parseEther } from "@ethersproject/units";
import { PlusOutlined, MinusOutlined } from '@ant-design/icons'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ETH_VAL } from "../../constants";
import { Account } from "../../components";

import {
  Container,
  InnerContainer,
  TextWrapper,
  NFTContainer,
  ProgressBarContainer,
  ButtonWrapper,
  ButtonOpensea,
  ImgWrapper,
  GifWrapper,
} from "./styles"; //k-k

export const Home = ({
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
  contract,
  signer,
  remainTokenCount,
  remainMintCount
}) => {
  const [amount, setAmount] = useState(ETH_VAL);
  const [minting, setMinting] = useState(false);
  const [currentAccount, setCurrentAccount] = useState(null);
  const [mintCount, setMintCount] = useState(1);

  const _decreaseMintCount = () => {
    if (mintCount == 1) return;
    setMintCount(mintCount - 1);
  };

  const _increaseMintCount = () => {
    if (remainMintCount < 1) {
      setMintCount(1);
      return
    }
    if (mintCount >= remainMintCount) {
      setMintCount(remainMintCount);
      return;
    }
    setMintCount(mintCount + 1);
  };

  const notify = (message) => toast(message);

  return (
    <Container id="header">
      <InnerContainer>
        <TextWrapper>
          <h1>The Underground</h1>
          {/* <h2>{2500 - remainTokenCount}/2500</h2> */}
          <NFTContainer>
            {/* <p>NFT Count {cnt > 0 && <span>{cnt}</span>}</p> */}
            {/* <ProgressBarContainer>
              <PointWrapper active={true} onClick={() => setCnt(1)} />
              <PointWrapper active={true} onClick={() => setCnt(1)} />
              <PointWrapper active={cnt > 1} onClick={() => setCnt(2)} />
            </ProgressBarContainer> */}
            <button onClick={_decreaseMintCount}><MinusOutlined /></button>
            <a className="mint_count">{mintCount}</a>
            <button className="add" onClick={_increaseMintCount}>
              <PlusOutlined />
            </button>
          </NFTContainer>
          <ButtonWrapper>
            <Account
              address={address}
              localProvider={localProvider}
              userSigner={userSigner}
              mainnetProvider={mainnetProvider}
              price={price}
              web3Modal={web3Modal}
              loadWeb3Modal={loadWeb3Modal}
              logoutOfWeb3Modal={logoutOfWeb3Modal}
              blockExplorer={blockExplorer}
              contract={contract}
              signer={userSigner}
              remainTokenCount={remainTokenCount}
              mintCount={mintCount}
              remainMintCount={remainMintCount}
              notify = {notify}
            />
          </ButtonWrapper>
          <ButtonOpensea>
            <a href="https://opensea.io/collection/the-underground-nft1" className="opensea" rel="noopener noreferrer" target="_blank">
              See in Opensea
            </a>
          </ButtonOpensea>
          <ToastContainer style={{zIndex: "10000"}}/>
        </TextWrapper>
        <ImgWrapper>
          <GifWrapper>
            {/* <img className="hero_img" src={phone} alt="" /> */}
          </GifWrapper>
        </ImgWrapper>
      </InnerContainer>
    </Container>
  );
};
