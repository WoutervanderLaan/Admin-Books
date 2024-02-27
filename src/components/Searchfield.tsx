"use client";

import { useEffect, useState } from "react";

type SearchFieldProps = {
  placeholder: string;
};

const SearchField = ({ placeholder }: SearchFieldProps) => {
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    console.log(searchValue);
  }, [searchValue]);

  return (
    <input
      placeholder={placeholder}
      className="p-2 w-full min-w-[400px] border-2 border-black outline-none rounded-md focus:border-blue-light transition-colors duration-200 ease-in-out"
      onChange={(e) => setSearchValue(e.currentTarget.value)}
    />
  );
};

export default SearchField;
