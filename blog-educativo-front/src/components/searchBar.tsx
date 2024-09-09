import React from "react";

interface SearchBarProps {
    searchTerm: string;
    setSearchTerm: (term: string) => void;
};

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