import React from "react";
import Form from "next/form";
import { Search } from "lucide-react";
import SearchReset from "./SearchReset";

const SearchBar = ({query} : {query?: string}) => {

  return (
    <Form action="/" scroll={false} id="form-search" className="max-w-2xl w-full font-nunito">
      <div className="flex items-center w-full focus-within:border-orange-500 transition duration-300 pr-3 gap-2 bg-white border-orange-500/30 border-[2px] h-[46px] rounded-[5px] overflow-hidden">
        <input
          name="query"
          defaultValue={query}
          type="text"
          placeholder="Buscar receitas"
          className="w-full h-full pl-4 outline-none placeholder-gray-500 text-sm"
        />

        <div className="flex gap-2">
          {query && 
          <SearchReset />
          }

          <button type="submit" className="flex justify-center items-center">
          <Search/>
          </button>
        </div>
      </div>
    </Form>
  );
};

export default SearchBar;
