import React, { useState, useEffect } from "react";
import styled from "styled-components";
import {
   BarChart,
   Line,
   XAxis,
   YAxis,
   CartesianGrid,
   Tooltip,
   Legend,
   Bar
} from "recharts";
import Axios from "axios";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";
import { convertToInt } from "../../helperFunctions";

const Model = ({ closeModel, data }) => {
   const [countryData, setCountryData] = useState([]);
   const [chartDataBy, setChartDataBy] = useState("new_cases");
   const [loading, setLoading] = useState(true);

   const getDataByCountry = async country => {
      const config = {
         headers: {
            "x-rapidapi-host": "coronavirus-monitor.p.rapidapi.com",
            "x-rapidapi-key":
               "c1811395a1msh5960c0f7b3dadb8p184bfajsn11c9f5640544"
         }
      };
      const res = await Axios.get(
         `https://coronavirus-monitor.p.rapidapi.com/coronavirus/cases_by_particular_country.php?country=${country}`,
         config
      );

      const allData = res.data.stat_by_country;
      const last = allData.length - 1;
      let dataToShow = [];
      let month = allData[last].record_date.slice(5, 7);
      let day = allData[last].record_date.slice(8, 10);
      let temp = day + "/" + month;
      allData[last].record_date = temp;
      allData[last].new_cases = convertToInt(allData[last].new_cases);
      allData[last].new_deaths = convertToInt(allData[last].new_deaths);
      allData[last].serious_critical = convertToInt(
         allData[last].serious_critical
      );
      allData[last].total_recovered = convertToInt(
         allData[last].total_recovered
      );
      dataToShow.unshift(allData[last]);

      for (let i = last - 1; i >= 0; i--) {
         if (
            allData[i].record_date.slice(8, 10) === day &&
            allData[i].record_date.slice(5, 7) === month
         )
            continue;

         month = allData[i].record_date.slice(5, 7);
         day = allData[i].record_date.slice(8, 10);
         temp = day + "/" + month;
         allData[i].record_date = temp;
         allData[i].new_cases = convertToInt(allData[i].new_cases);
         allData[i].new_deaths = convertToInt(allData[i].new_deaths);
         allData[i].serious_critical = convertToInt(
            allData[i].serious_critical
         );
         allData[i].total_recovered = convertToInt(allData[i].total_recovered);
         dataToShow.unshift(allData[i]);
      }

      setCountryData(dataToShow);
      setLoading(false);
   };

   useEffect(() => {
      getDataByCountry(data.country_name);
   }, [loading]);

   return (
      <Container>
         <i onClick={closeModel} className="fas fa-times close"></i>

         {loading ? (
            <Loader
               type="Puff"
               color="#8884d8"
               height={100}
               width={100}
               timeout={3000} //3 secs
            />
         ) : (
            <>
               <h2>{countryData[0].country_name}</h2>
               <BarChart
                  width={window.innerWidth * 0.9}
                  height={window.innerHeight * 0.7}
                  data={countryData}
                  className="chart"
               >
                  <CartesianGrid strokeDasharray="3 3" />
                  <Tooltip
                     labelStyle={{ color: "black" }}
                     wrapperStyle={{ color: "black" }}
                  />
                  <XAxis dataKey="record_date" />
                  <YAxis />
                  <Bar
                     dataKey={chartDataBy}
                     fill="#8884d8"
                     label={
                        window.innerWidth > 600 ? { position: "top" } : null
                     }
                  />
               </BarChart>
               <div className="control">
                  <span
                     onClick={() => setChartDataBy("new_cases")}
                     className={chartDataBy === "new_cases" && "active"}
                  >
                     Active
                  </span>
                  <span
                     onClick={() => setChartDataBy("total_deaths")}
                     className={chartDataBy === "new_deaths" && "active"}
                  >
                     Deaths
                  </span>
                  <span
                     onClick={() => setChartDataBy("serious_critical")}
                     className={chartDataBy === "serious_critical" && "active"}
                  >
                     Critical
                  </span>
                  <span
                     onClick={() => setChartDataBy("total_recovered")}
                     className={chartDataBy === "total_recovered" && "active"}
                  >
                     Recovered
                  </span>
               </div>
            </>
         )}
      </Container>
   );
};

const Container = styled.div`
   position: absolute;
   display: flex;
   flex-direction: column;
   justify-content: center;
   align-items: center;

   left: 50%;
   transform: translate(-50%, -50%);
   background-color: #eee;
   border-radius: 0.5em;
   width: 95vw;
   height: 80vh;
   z-index: 10;
   h2 {
      color: #47536a !important;
      font-weight: bold;
      font-size: 1.5em;
      padding: 0.5em;
   }
   .close {
      cursor: pointer;
      position: absolute;
      top: 5px;
      right: 5px;
   }
   .control {
      display: flex;
      span {
         cursor: pointer;
         color: black;
         margin: 0.5em;
      }
      .active {
         color: #8884d8;
      }
   }
   .chart {
   }
   @media (max-width: 600px) {
      width: 95vw;
      height: 80vh;
   }
`;
export default Model;
