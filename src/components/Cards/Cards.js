import React, { useContext } from "react";
import styled from "styled-components";
import Card from "../Card/Card";
import Context from "../../store/Context";
import { v4 as uuidv4 } from "uuid";

const Cards = ({ data }) => {
   const context = useContext(Context);
   return (
      <Container>
         {context.isSearchMod
            ? context.searchDataByCountry.map(c => {
                 return <Card key={uuidv4()} country={c} />;
              })
            : context.dataByCountry.map(c => {
                 return <Card key={uuidv4()} country={c} />;
              })}
      </Container>
   );
};
const Container = styled.div`
   display: flex;
   flex-wrap: wrap;
   justify-content: center;
   @media (max-width: 600px) {
   }
`;
export default Cards;
