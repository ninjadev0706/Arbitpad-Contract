import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
   :root{
      --purple-primary: #554DDE;
      --accent-pink: #F44E77;
      --neutral-light: #F2F6FF;
      --lavender-secondary: #6A6D9E; /*Primary Font Color*/
      --dark-primary: #000;
      --border-colour: #CAD6F1;
   }
   *{
      margin: 0;
      padding: 0;
      list-style: none;
      box-sizing: border-box;
      font-family: azo-sans-uber,sans-serif;
      text-decoration: none;
   }

   body{
      font-size: 1.2rem;
   }

   a{
      color: inherit;
   }
   p{
      line-height: 1.9rem;
   }
   .secondary-heading{
      font-size: 3rem;
   }
   .small-heading{
      color: lightgrey;
      font-size: 100px;
      text-align: center;
      font-weight: bolder;
      line-height: 1.2;
   }

   //utilities

   .c-para{
      text-align: center;
   }

   @media only screen and (max-width: 800px) {
      .small-heading{
         font-size: 40px;
      }
   }
   .subtext {
      margin-left: 20px;
   }

   .sub-li {
      list-style: square !important;
   }
`;

export default GlobalStyle;