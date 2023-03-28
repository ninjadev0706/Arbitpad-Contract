import React, { useState } from 'react';
import styled from 'styled-components';
import { useEffect } from 'react';

const SelectedNFT = (props) => {

    const [reveal, setReveal] = useState(0);
    const { displayArr, removeNFT, revealedStatus } = props;

    useEffect(() => {
        console.log("++++", displayArr)
    }, [displayArr])

    useEffect(() => {
        if (revealedStatus) {
            setReveal(revealedStatus);
        }
    }, [revealedStatus])

    return (
        <Container className="rsvpapebox">
            {(() => {
                let td = [];
                for (let i = 0; i < displayArr.length; i++) {
                    td.push(
                        <a key={i} style={{ width: displayArr.length === 1 ? '100%' : '48%' }}>
                            {
                                reveal === 0 ?
                                    <img
                                        // src={`https://cyberhuntress.mypinata.cloud/ipfs/QmWApVwer2onmLqZRMjJfeSfHiNHXkehCgGgsReY1Q5aWs/${displayArr[i]}.png`}
                                        src="https://monaco.mypinata.cloud/ipfs/QmXgX269pL2j7G1dpuBNK4CwoWEtZkUQnZenNbwVEry49G/unrevealed.jpg"
                                        onClick={() => removeNFT(i, displayArr[i])}
                                        alt=''
                                    />
                                    :
                                    <img
                                        src={`https://cyberhuntress.mypinata.cloud/ipfs/QmWApVwer2onmLqZRMjJfeSfHiNHXkehCgGgsReY1Q5aWs/${displayArr[i]}.png`}
                                        // src={`https://monaco.mypinata.cloud/ipfs/QmXgX269pL2j7G1dpuBNK4CwoWEtZkUQnZenNbwVEry49G/${displayArr[i]}.jpg`}
                                        onClick={() => removeNFT(i, displayArr[i])}
                                        alt=''
                                    />
                            }
                            <div className="apenum">#{displayArr[i]}</div>
                        </a>
                    );
                }
                return td;
            })()}
        </Container>
    )
}

const Container = styled.div`
    position: relative;
    width: 100%;
    margin-left: auto;
    justify-content: space-between;
    display: flex;
    flex-wrap: wrap;
    grid-gap: 10px;
    gap: 10px;
    a {
       margin-bottom: 8px;
       position: relative;
       width: 48%;
       img {
          opacity: 1;
          cursor: pointer;
          vertical-align: middle;
          border-style: none;
          max-width: 100%;
          height: auto;
          display: block;
          border-radius: 10px;
          min-width: 150px;
       }
       .apenum {
          top: 5px;
          font-size: 15px;
          left: 8px;
          opacity: .5;
          color: #000;
          margin-top: 2px;
          text-align: left;
          width: 100%;
          position: absolute!important;
       }
    }
`

export default SelectedNFT
