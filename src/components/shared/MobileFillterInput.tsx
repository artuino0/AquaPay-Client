import React, { useEffect, useState } from "react";

interface FilterInputProps {
  keyword: string;
  placeholder: string;
  setKeyword: (keyword: string) => void;
}

const MobileFilterInput: React.FC<FilterInputProps> = ({
  keyword,
  placeholder = "Buscar por contrato, nombre, correo o telefono",
  setKeyword,
}) => {
  const [inputValue, setInputValue] = useState(keyword);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const sendKeyword = () => {
    setKeyword(inputValue);
  };

  const cleanKeyword = () => {
    setInputValue("");
    setKeyword("");
  };

  return (
    <div className="sticky top-[46px]">
      <input
        type="text"
        className="border border-t-0 pl-2 pr-[49px] py-3 w-full outline-none rounded-none "
        placeholder={placeholder}
        value={inputValue}
        onChange={handleChange}
      />
      {inputValue !== "" && keyword !== "" ? (
        <div
          className="absolute right-0 -top-[1px] flex justify-center items-center text-white h-[49px] w-[49px] bg-red-500 border border-red-500"
          onClick={cleanKeyword}
        >
          <i className="bi bi-eraser-fill"></i>
        </div>
      ) : (
        <div
          className="absolute right-0 -top-[1px] flex justify-center items-center text-white h-[49px] w-[49px] bg-blue-500 border border-blue-500"
          onClick={sendKeyword}
        >
          <i className="bi bi-search "></i>
        </div>
      )}
    </div>
  );
};

export default MobileFilterInput;
