import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import Cards from "./components/Cards/Cards";
import Control from "./components/Control/Control";
import IsraelStatistic from "./components/IsraelStatistic/IsraelStatistic";
import Context from "./store/Context";

function App() {
   const context = useContext(Context);
   useEffect(() => {
      context.fetchAndStore();
   }, [context.isLoading]);

   return (
      <Container>
         <h1>Covid-19 Statistics</h1>
         <IsraelStatistic />
         <Control />
         <Cards />
      </Container>
   );
}
const Container = styled.div`
   display: flex;
   height: 100vh;
   max-width: 70vw;
   margin: 0 auto;
   flex-direction: column;
   h1 {
      color: #eeeeee;
      text-align: center;
      padding: 1em;
   }
   @media (max-width: 600px) {
      max-width: 100vw;
      margin: 0;
      h1 {
         padding: 1.8em;
         padding-bottom: 1em;
      }
   }
`;

export default App;
