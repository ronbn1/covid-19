import React, { useState } from "react";
import Context from "./Context";
import Axios from "axios";

const ContextProvider = props => {
   const [dataByCountry, setDataByCountry] = useState([]);
   const [searchDataByCountry, setSearchDataByCountry] = useState([]);
   const [searchValue, setSearchValue] = useState("");
   const [isSearchMod, setIsSearchMod] = useState(false);
   const [isLoading, setIsLoading] = useState(true);
   const [sortedBy, setSortedBy] = useState("");

   const fetchAndStore = async () => {
      if (!isLoading) return;
      const config = {
         headers: {
            "x-rapidapi-host": "coronavirus-monitor.p.rapidapi.com",
            "x-rapidapi-key":
               "c1811395a1msh5960c0f7b3dadb8p184bfajsn11c9f5640544"
         }
      };
      const res = await Axios.get(
         "https://coronavirus-monitor.p.rapidapi.com/coronavirus/cases_by_country.php",
         config
      );
      setDataByCountry(res.data.countries_stat);
      setIsLoading(false);
   };
   const sortData = key => {
      if (isLoading) return;
      const sortedData = [...dataByCountry];
      sortedData.sort((a, b) => {
         let first = a[key];
         let second = b[key];

         let commaIndex = first.indexOf(",");
         if (commaIndex !== -1) first = first.replace(",", "");

         commaIndex = second.indexOf(",");
         if (commaIndex !== -1) second = second.replace(",", "");

         if (parseInt(first) > parseInt(second)) return -1;
         else if (parseInt(first) < parseInt(second)) return 1;
         return 0;
      });
      setDataByCountry(sortedData);
      setSortedBy(key);
   };

   const search = key => {
      const filteredData = dataByCountry.filter(c =>
         c.country_name.toLowerCase().includes(key.toLowerCase())
      );
      setSearchDataByCountry(filteredData);
   };
   return (
      <Context.Provider
         value={{
            dataByCountry,
            setDataByCountry,
            fetchAndStore,
            sortData,
            isLoading,
            sortedBy,
            search,
            isSearchMod,
            setIsSearchMod,
            searchValue,
            setSearchValue,
            searchDataByCountry
         }}
      >
         {props.children}
      </Context.Provider>
   );
};

export default ContextProvider;
