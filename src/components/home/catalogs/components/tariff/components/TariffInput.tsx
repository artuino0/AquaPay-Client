import { useState } from "react";

interface IProp {
  amount: string;
  cycleId: string;
  tariffId: string;
}

const TariffInput = (prop: IProp) => {
  const { amount, cycleId, tariffId } = prop;

  const [inputValue, setInputValue] = useState<string>(amount);

  return (
    <>
      <input
        type="number"
        className="number-input text-center w-fit h-full py-2 outline-deep-blue bg-transparent"
        value={inputValue}
        onChange={(e) => {
          setInputValue(e.target.value);
        }}
      />
    </>
  );
};

export default TariffInput;
