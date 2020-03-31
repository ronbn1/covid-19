import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import Context from "../../store/Context";
import Model from "../Model/Model";

const IsraelStatistic = () => {
   const context = useContext(Context);
   const [israelData, setIsraelData] = useState([]);
   const [modelIsOpen, setModelIsOpen] = useState(false);

   useEffect(() => {
      if (!context.isLoading) {
         const israel = context.dataByCountry.filter(
            c => c.country_name === "Israel"
         );
         setIsraelData(...israel);
      }
   }, [context.isLoading]);

   return (
      <Container>
         {modelIsOpen ? (
            <Model closeModel={() => setModelIsOpen(false)} data={israelData} />
         ) : null}
         <div className="header">
            <h2>Israel's Statistics</h2>
            <i
               className="fas fa-chart-line "
               onClick={() => setModelIsOpen(true)}
            ></i>
         </div>
         <div className="table">
            <div className="cel active">
               <p>ACTIVE</p>
               {context.isLoading ? null : <p>{israelData.active_cases}</p>}
            </div>
            <div className="cel  critical">
               <p>Critical</p>
               {context.isLoading ? null : <p>{israelData.serious_critical}</p>}
            </div>
            <div className="cel deaths">
               <p>Deaths</p>
               {context.isLoading ? null : <p>{israelData.deaths}</p>}
            </div>
            <div className="cel recovered">
               <p>Recovered</p>
               {context.isLoading ? null : <p>{israelData.total_recovered}</p>}
            </div>
         </div>
      </Container>
   );
};

const Container = styled.div`
   .header {
      display: flex;
      background-color: #20293d;
      border-radius: 0.5em;
      position: relative;
      width: fit-content;
      left: 50%;
      top: 0.5em;
      z-index: 0;
      transform: translateX(-50%);
      i {
         align-self: center;
         margin: 0 1em;
         color: #ffa41b;
      }
      h2 {
         text-align: center;
         color: #ffa41b;
         font-weight: bold;
         font-size: 1.5em;
         padding: 0.8em;
      }
   }
   .table {
      display: flex;
      width: 100vw;
      margin-left: -15vw;
      background-image: linear-gradient(74deg, #131925, #2b3853);
      position: relative;
      flex-wrap: wrap;
      box-shadow: 0px 10px 20px 0px #00000060;

      .cel {
         display: flex;
         justify-content: space-around;
         width: 49.5%;
         height: 3em;

         p {
            text-align: center;
            line-height: 2.5em;
            font-size: 1.3em;
            color: #ffa41b;
         }
      }
      .active {
         border-right: 1px dashed #ffffff50;
         border-bottom: 1px dashed #ffffff50;
      }
      .deaths {
         border-right: 1px dashed #ffffff50;
      }
      .critical {
         border-bottom: 1px dashed #ffffff50;
      }
      .recovered {
      }
   }
   @media (max-width: 600px) {
      .header {
         h2 {
            font-size: 1.2em;
         }
      }
      .table {
         margin: 0;
         .cel {
      

         p {
          
            font-size: 1em;
      
         }
      }
   }
  
`;
export default IsraelStatistic;
