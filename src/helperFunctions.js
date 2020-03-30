export const convertToInt = str => {
   const indexOfComma = str.indexOf(",");
   if (indexOfComma === -1) return parseInt(str);
   let num =
      str.slice(0, indexOfComma) + str.slice(indexOfComma + 1, str.length);

   return parseInt(num);
};
