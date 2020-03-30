import React, { useState, useContext, useEffect } from "react";
import styled from "styled-components";
import Context from "../../store/Context";
const Control = () => {
   const context = useContext(Context);
   const onChangeSelect = e => {
      let type = e.target.value.toLowerCase();
      if (type === "recovered") type = "total_recovered";
      if (type === "active") type = "active_cases";
      if (type === "critical") type = "serious_critical";
      if (type === "todaycases") type = "new_cases";
      if (type === "todaydeaths") type = "new_deaths";
      context.sortData(type);
   };

   const onSearch = e => {
      context.setIsSearchMod(true);
      context.setSearchValue(e.target.value);
      context.search(e.target.value);
   };

   useEffect(() => {
      if (context.searchValue === "") context.setIsSearchMod(false);
   }, [context.searchValue]);

   return (
      <Container>
         <div className="search">
            <label>
               <span>Search: </span>
               <input
                  type="text"
                  value={context.searchValue}
                  onChange={onSearch}
               />
            </label>
         </div>
         <div className="sort">
            <span>Sort By: </span>
            <select onChange={onChangeSelect}>
               <option>Active</option>
               <option>Cases</option>
               <option>Critical</option>
               <option>Deaths</option>
               <option>Recovered</option>
               <option>TodayCases</option>
               <option>TodayDeaths</option>
            </select>
         </div>
      </Container>
   );
};
const Container = styled.div`
   display: flex;
   justify-content: center;
   margin: 1.5em 0;
   color: #eeeeee;
   .search {
      label {
         padding: 2em;
         span {
         }
         input {
            background-color: transparent;
            border: 1px solid whitesmoke;
            border-radius: 0.3em;
            color: whitesmoke;
            outline: none;
            text-align: center;
            font-size: 1em;
            width: 7em;
            margin: 0.3em;
         }
      }
   }

   .sort {
      align-self: center;
      span {
         margin-right: 0.3em;
      }
      select {
         option {
         }
      }
   }
   /* margin: 1em 0;
   display: flex;
   justify-content: center;
   .search {
      margin: 0 1em;

      span {
         margin-right: 0.5em;
      }
      input {
         background-color: transparent;
         border: 1px solid #393e46;
         border-radius: 0.5em;
         padding: 0.2em;
         color: whitesmoke;
         outline: none;
         text-align: center;
         font-size: 1em;
         width: 10em;
         margin-right: 5em;
      }
   }
   .sort {
      display: flex;
      justify-content: center;
      span {
         margin-right: 0.5em;
         align-self: center;
      }
      select {
         text-align: center;
         option {
         }
      }
   } */
   @media (max-width: 600px) {
      max-width: 95vw;
      display: flex;

      .search {
         label {
            padding: 0.2em;
            span {
            }
            input {
               background-color: transparent;
               border: 1px solid whitesmoke;
               border-radius: 0.3em;
               color: whitesmoke;
               outline: none;
               text-align: center;
               font-size: 1em;
               width: 7em;
               margin: 0.3em;
            }
         }
      }

      .sort {
         align-self: center;
         span {
            margin-right: 0.3em;
         }
         select {
            option {
            }
         }
      }
      /* padding: 0 1em;
      .search {
         label {
            display: flex;
            span {
               margin-right: 1em;
               align-self: center;
            }
            input {
               background-color: transparent;
               border-right: none;
               border-top: none;
               border-left: none;
               border: 1px solid whitesmoke;
               color: whitesmoke;
               outline: none;
               text-align: center;
               font-size: 1em;
               width: 7em;
            }
         }
      }
      .sort {
         display: flex;
         justify-content: center;
         select {
            option {
            }
         }
      } */
   }
`;
export default Control;
