"use client";

import Link from "next/link";
import React from "react";
import { X } from "lucide-react";

const SearchReset = () => {
  const reset = () => {
    const form = document.querySelector("#form-search") as HTMLFormElement;

    if (form) form.reset();
  };

  return (
    <button type="reset" onClick={reset}>
      <Link href="/" className="flex justify-center items-center">
        <X />
      </Link>
    </button>
  );
};

export default SearchReset;
