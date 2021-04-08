
import React from 'react';


const SearchBar = ({keyword,setKeyword}) => {
  return (
    <input 
     key="random1"
     value={keyword}
     placeholder={"search Restaurant"}
     onChange={(e) => setKeyword(e.target.value)}
    />
  );
}

export default SearchBar