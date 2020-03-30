import React, { useState, useContext, useEffect } from "react";
import styled from "styled-components";
import Context from "../../store/Context";
import Axios from "axios";
import Model from "../Model/Model";

const Card = ({ country }) => {
   const context = useContext(Context);
   const [flagSrc, setFlagSrc] = useState("");
   const [isLoadingFlags, setIsLoadingFlags] = useState(true);
   const [modelIsOpen, setModelIsOpen] = useState(false);

   useEffect(() => {
      getFlag();
   }, [country.country_name]);

   const getFlag = async () => {
      const res = await Axios.get(
         `https://restcountries.eu/rest/v2/name/${country.country_name}
         `
      );
      setFlagSrc(res.data[0].flag);
      setIsLoadingFlags(false);
   };

   return (
      <Container>
         {modelIsOpen ? (
            <Model closeModel={() => setModelIsOpen(false)} data={country} />
         ) : null}
         <div className="header">
            <h2>{country.country_name}</h2>
            <i
               className="fas fa-chart-line "
               onClick={() => setModelIsOpen(true)}
            ></i>
            {!isLoadingFlags && <img src={flagSrc} alt="flag" />}
         </div>
         <div className="content">
            <div
               className={
                  context.sortedBy === "active_cases" ? "row bold" : "row"
               }
            >
               <p>Active</p>
               <p>{country.active_cases}</p>
            </div>
            <div className={context.sortedBy === "cases" ? "row bold" : "row"}>
               <p>Cases</p>
               <p>{country.cases}</p>
            </div>
            <div
               className={
                  context.sortedBy === "serious_critical" ? "row bold" : "row"
               }
            >
               <p>Critical</p>
               <p>{country.serious_critical}</p>
            </div>
            <div className={context.sortedBy === "deaths" ? "row bold" : "row"}>
               <p>Deaths</p>
               <p>{country.deaths}</p>
            </div>
            <div
               className={
                  context.sortedBy === "total_recovered" ? "row bold" : "row"
               }
            >
               <p>Recovered</p>
               <p>{country.total_recovered}</p>
            </div>
            <div
               className={context.sortedBy === "new_cases" ? "row bold" : "row"}
            >
               <p>Today Cases</p>
               <p>{country.new_cases}</p>
            </div>
            <div
               className={
                  context.sortedBy === "new_deaths" ? "row bold" : "row"
               }
            >
               <p>Today Deaths</p>
               <p>{country.new_deaths}</p>
            </div>
            <div className="row">
               <p>Total Cases Per 1M</p>
               <p>{country.total_cases_per_1m_population}</p>
            </div>
         </div>
      </Container>
   );
};
const Container = styled.div`
   width: 20em;
   height: 20em;
   margin: 1em;
   box-shadow: 0px 0px 20px 0px black;

   p {
      color: #eeeeee;
   }

   .bold {
      font-weight: bold;
      color: #eeeeee;
   }
   .header {
      display: flex;
      justify-content: space-around;
      height: 2.2em;
      background-color: #393e46;
      text-align: center;
      line-height: 2.2em;
      font-size: 1.2em;
      h2 {
         color: #eeeeee;
         font-weight: bold;
      }
      img {
         margin-left: 1em;
         max-height: 1.2em;
         align-self: center;
      }
      i {
         color: #ffa41b;
         align-self: center;
      }
   }
   .content {
      display: flex;
      flex-direction: column;
      justify-content: center;
      margin-top: 0.5em;
      .grid {
         display: flex;
         flex-wrap: wrap;
         height: 100%;
         div {
            height: calc((100% - 5em) / 2);
            width: 10em;
            p {
               text-align: center;
            }
         }
      }
      .row {
         display: flex;
         justify-content: space-between;
         padding: 0.5em 3em;
      }
   }
`;
export default Card;
