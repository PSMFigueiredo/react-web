import React from "react";
import {SearchBarProps} from "../types/SearchBar.ts";


const SearchBar: React.FC<SearchBarProps> = ({searchTerm, setSearchTerm}) => {
    return(
        <input
        type="text"
        placeholder="Search posts..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        />
    );
};
export default SearchBar;