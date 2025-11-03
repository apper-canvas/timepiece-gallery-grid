import React, { useState, useEffect } from "react";
import Input from "@/components/atoms/Input";

const SearchBar = ({ onSearch, placeholder = "Search watches...", className }) => {
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      onSearch(searchTerm);
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [searchTerm, onSearch]);

  return (
    <Input
      type="text"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      placeholder={placeholder}
      leftIcon="Search"
      className={className}
    />
  );
};

export default SearchBar;