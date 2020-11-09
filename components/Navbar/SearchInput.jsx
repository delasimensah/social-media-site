import React from "react";

import { IoSearchOutline } from "react-icons/io5";

//components
import FormInput from "../FormInput";

const SearchInput = () => {
  return (
    <FormInput
      name="search"
      type="search"
      placeholder="search"
      icon={<IoSearchOutline className="form-icon" />}
    />
  );
};

export default SearchInput;
