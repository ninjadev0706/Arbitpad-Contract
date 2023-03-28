import React from 'react'
import styled from 'styled-components'
import { InnerLayout } from '../styles/Layout'
// import logo from '../assets/img/footer.jpg'
import discord from '../assets/img/social-icons/discord.svg'
import twitter from '../assets/img/social-icons/twitter.png'
import instagram from '../assets/img/social-icons/instagram.svg'

const Footer = () => {
   return (
      <FooterStyled>
         <InnerLayout style={{marginTop: "-100px"}}>
            <div className="footer-con">
               <div className="logo-con">
                  <div className="logo-wrap">
                     {/* <img src={logo} alt=""/> */}
                     <p>
                        Copyright @{(new Date().getFullYear())} Underground <br />
                        All rights reserved
                     </p>
                  </div>
               </div>
               <ul className="bottom-nav">
                  <div className="links1">
                     <li><a href="https://discord.gg/jhNrzpmxKw" target="_blank" rel="noreferrer"><img src={discord} alt=""/></a></li>
                  </div>
                  <div className="links2">
                     <li><a href="https://twitter.com/NFTUndrGround" target="_blank" rel="noreferrer"><img src={twitter} alt=""/></a></li>
                  </div>
                  <div className="links3">
                     <li><a href="https://www.instagram.com/undrground_nfts"  target="_blank" rel="noreferrer"><img src={instagram} alt=""/></a></li>
                  </div>
               </ul>
            </div>
         </InnerLayout>
      </FooterStyled>
   )
}
const FooterStyled = styled.footer`
   background-color: black;
   .footer-con{
      width: 1150px;
      margin: auto;
      grid-template-columns: repeat(2 , 1fr);
      .logo-con{
         justify-content: center;
         display: flex;
         align-items: center;
         img{
            width: 500px;
         }
         .logo-wrap {
            text-align: center;
            p {
               padding-top: 20px;
               color: white;
            }
         }
      }

      .bottom-nav {
         img {
            width: 50px;
         }
      }
      @media screen and (max-width: 480px){
         grid-template-columns: repeat(1 , 1fr);
         .logo-wrap{
            margin: 0 auto;
            p{ 
               display: none;
            }
         }
         .logo-con{
            img{
               width: 300px;
            }
         }
      }
   }
   .bottom-nav{
      display: flex;
      justify-content: center;

      li{
         padding: 2rem;
         color: #16194f;
      }
   }
   @media only screen and (max-width: 1300px) {
      .footer-con{
         width: 90%;
         .bottom-nav {
            img {
               width: 50px;
            }
            li{
               padding: 10px;
               color: #16194f;
            }
         }
      }
   }
`

export default Footer
