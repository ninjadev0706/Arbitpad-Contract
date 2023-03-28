import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import InfiniteScroll from "react-infinite-scroll-component";

const NFTGrp = (props) => {
    const [reservedNFTs, setReserveNFTs] = useState([]);
    const [reveal, setReveal] = useState(0);
    let reArr = [];

    const { length, hasMore, fetchMoreData, randomNum, addNFT, reservedIds, reservednotify, revealedStatus, currentPrice, endedPrice, end } = props;
    useEffect(() => {
        if (reservedIds) {
            reservedIds.map((reId) => {
                reArr.push(Number(reId));
            })
            setReserveNFTs([...reArr])
        }
    }, [reservedIds])

    useEffect(() => {
        if (revealedStatus) {
            setReveal(revealedStatus);
        }
    }, revealedStatus)

    return (
        <NFTContainer>
            <InfiniteScroll
                dataLength={length}
                next={fetchMoreData}
                hasMore={hasMore}
                loader={<h4>Loading...</h4>}
                endMessage={
                    <p style={{ textAlign: "center" }}>
                        <b>Yay! You have seen it all</b>
                    </p>
                }
            >
                <NFTWrap>
                    {(() => {
                        let td = [];
                        for (let i = 0; i < length; i++) {
                            td.push(
                                <NFTItem key={i}>
                                    {
                                        reservedNFTs.findIndex((reNFT) => reNFT === randomNum[i]) > -1 ?
                                            <>
                                                {
                                                    reveal !== 0 ?
                                                        <img className="apetaken1"
                                                            src={`https://monaco.mypinata.cloud/ipfs/QmXgX269pL2j7G1dpuBNK4CwoWEtZkUQnZenNbwVEry49G/${randomNum[i]}.jpg`}
                                                            alt=''
                                                        />
                                                        :
                                                        <>
                                                            {
                                                                (currentPrice >= endedPrice || end) ?
                                                                    <img className="apetaken1"
                                                                        src="https://monaco.mypinata.cloud/ipfs/QmXgX269pL2j7G1dpuBNK4CwoWEtZkUQnZenNbwVEry49G/unrevealed.jpg"
                                                                        alt=''
                                                                    />
                                                                    :
                                                                    <img className="apetaken1"
                                                                        src="https://monaco.mypinata.cloud/ipfs/QmXgX269pL2j7G1dpuBNK4CwoWEtZkUQnZenNbwVEry49G/unrevealed.jpg"
                                                                        alt=''
                                                                        onClick={() => reservednotify(randomNum[i])}
                                                                    />
                                                            }
                                                        </>
                                                }

                                                <div className="reservedbadge">
                                                    <img className="apetaken"
                                                        src="/reserve.png"
                                                        alt=''
                                                    />
                                                </div>
                                            </>
                                            :
                                            <>
                                                {
                                                    reveal === 0 ?
                                                        <>
                                                            {
                                                                (currentPrice >= endedPrice || end) ?
                                                                    <img className="apetaken"
                                                                        src="https://monaco.mypinata.cloud/ipfs/QmXgX269pL2j7G1dpuBNK4CwoWEtZkUQnZenNbwVEry49G/unrevealed.jpg"
                                                                        alt=''
                                                                    />
                                                                    :
                                                                    <img className="apetaken"
                                                                        src="https://monaco.mypinata.cloud/ipfs/QmXgX269pL2j7G1dpuBNK4CwoWEtZkUQnZenNbwVEry49G/unrevealed.jpg"
                                                                        alt=''
                                                                        onClick={() => addNFT(randomNum[i])}
                                                                    />
                                                            }
                                                        </>

                                                        :
                                                        <img className="apetaken"
                                                            src={`https://monaco.mypinata.cloud/ipfs/QmXgX269pL2j7G1dpuBNK4CwoWEtZkUQnZenNbwVEry49G/${randomNum[i]}.jpg`}
                                                            alt=''
                                                        />
                                                }
                                            </>
                                    }
                                    <div className="takennum">#{randomNum[i]}</div>
                                </NFTItem>
                            );
                        }
                        return td;
                    })()}
                </NFTWrap>
            </InfiniteScroll>
        </NFTContainer>
    )
}

const NFTContainer = styled.div`
    display: flex;
    flex-flow: row wrap;
    align-content: space-between;
    justify-content: normal;
    margin: auto;
    width: 100%;
`

const NFTWrap = styled.div`
    height: auto;
    overflow: hidden auto;
    display: flex;
    flex-wrap: wrap;
    vertical-align: middle;
    border-style: none;
`

const NFTItem = styled.div`
    padding: .5%;
    margin: 0 auto;
    position: relative;
    .apetaken{
        opacity: .8;
        width: 192px;
        cursor: pointer;
        max-width: 100%;
        border-radius: 10px;
    }
    .apetaken1 {
        opacity: .2;
        width: 192px;
        cursor: not-allowed;
        max-width: 100%;
        border-radius: 10px;
    }
    @media only screen and (max-width: 600px) {
        width: 33%;
        position: relative;
    }
    .takennum {
        top: 10px!important;
        left: 16px!important;
        font-size: 12px;
        text-align: left;
        width: 100%;
        position: absolute!important;
        padding: .5%;
        // opacity: .3!important;
    }
    .reservedbadge {
        top: 0px!important;
        left: 100px!important;
        font-size: 12px;
        text-align: left;
        width: 100px;
        position: absolute!important;
        padding: .5%;
        @media only screen and (max-width: 700px) {
            top: 5px!important;
            left: 30px!important;
            width: 70px;
        }
    }
    .reserve {
        top: 10px!important;
        left: 16px!important;
        font-size: 12px;
        text-align: left;
        width: 100%;
        position: absolute!important;
        padding: .5%;
    }
`

export default NFTGrp
