import React, { useEffect, useState } from "react";

interface FilterInputProps {
  keyword: string;
  setKeyword: (keyword: string) => void;
  meterless?: boolean;
  setMeterless?: (meterless: boolean) => void;
}

const FilterInput: React.FC<FilterInputProps> = ({
  keyword,
  setKeyword,
  meterless = false,
  setMeterless,
}) => {
  const [inputValue, setInputValue] = useState(keyword);
  const [isMeterless, setIsMeterless] = useState(meterless);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleToggle = () => {
    setIsMeterless(!isMeterless);
    if (setMeterless) {
      setMeterless(!isMeterless);
    }
  };

  useEffect(() => {
    const handler = setTimeout(() => {
      setKeyword(inputValue);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [inputValue, setKeyword]);

  return (
    <div className="text-sm flex items-center justify-end py-2 px-2 gap-6">
      {meterless !== undefined && setMeterless && (
        <label className="inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            className="sr-only peer"
            checked={isMeterless}
            onChange={handleToggle}
          />
          <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 rounded-full peer dark:bg-blue-100 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full  after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all  peer-checked:bg-blue-600"></div>
          <span className="ms-3 text-sm font-medium">Ocultar sin medidor</span>
        </label>
      )}
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
