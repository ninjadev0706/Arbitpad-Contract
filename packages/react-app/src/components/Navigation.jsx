import React from 'react'
import styled from 'styled-components'

const Navigation = ({ address, loadWeb3Modal, web3Modal, logoutOfWeb3Modal }) => {

   return (
      <NavigationStyled>
         <div className="side">
            <div>

            </div>
            {
               web3Modal && web3Modal.cachedProvider ?
                  <button type="button"
                     onClick={logoutOfWeb3Modal}
                  >
                     {address && address.slice(0, 5)}...{address && address.slice(-5)} (Disconnect)
                  </button>
                  :
                  <button type="button"
                     onClick={loadWeb3Modal}
                  >
                     Connect
                  </button>
            }

         </div>
      </NavigationStyled>
   )
}

const NavigationStyled = styled.nav`
   display: flex;
   align-items: center;
   justify-content: space-between;
   z-index: 1;
   height: 64px;
   padding: 0px 50px;
   color: rgba(0, 0, 0, 0.85);
   background: white;
   justify-content: end;
   .side {
      grid-gap: 5px;
      gap: 5px;
      align-items: center;
      position: relative;
      padding: 5px 0;
      align-content: center;
   }
   button {
      flex: 1 1;
      border: 1px solid rgb(217, 217, 217);
      cursor: pointer;
      transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1) 0s;
      height: 32px;
      width: 100%;
      padding: 4px 15px;
      font-size: 14px;
      border-radius: 4px;
      background-color: #fff;
      color: black;
   }
   @media only screen and (max-width: 600px) {
      padding: 15px;
   }
`

export default Navigation
