import React, { useEffect, useState } from "react";

interface FilterInputProps {
  keyword: string;
  setKeyword: (keyword: string) => void;
}

const FilterInput: React.FC<FilterInputProps> = ({ keyword, setKeyword }) => {
  const [inputValue, setInputValue] = useState(keyword);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  useEffect(() => {
    const handler = setTimeout(() => {
      setKeyword(inputValue);
    }, 1500);

    return () => {
      clearTimeout(handler);
    };
  }, [inputValue, setKeyword]);

  return (
    <div className="text-sm flex justify-end py-2 px-2">
      <input
        type="text"
        className="border py-2 px-2 w-[500px] rounded-md outline-deep-blue"
        placeholder="Buscar por contrato, nombre, correo o telefono"
        value={inputValue}
        onChange={handleChange}
      />
    </div>
  );
};

export default FilterInput;
