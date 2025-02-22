import React, { useState } from "react";
import ChangeStore from "../../../../../../store/ChangesStore";
import { useEffect } from "react";

interface IProp {
  amount: string;
  cycleId: string;
  tariffId: string;
  tariffType: string;
}

const TariffInput: React.FC<IProp> = ({ amount, tariffId, tariffType, cycleId }) => {
  const [inputValue, setInputValue] = useState<string>("0");
  const { addChange, changes, updateChange, removeChange } = ChangeStore();

  useEffect(() => {
    if (changes.some((change) => change.tariffId === tariffId)) {
      setInputValue(changes.filter((change) => change.tariffId === tariffId && change.typeTariff === tariffType)[0].newTariff);
      return;
    }

    setInputValue(amount);
  }, []);

  const handleOnBlur = () => {
    const changeTariff = changes.filter((change) => change.tariffId === tariffId && change.typeTariff === tariffType)[0];

    if (inputValue === amount) return;

    if (changeTariff) {
      if (inputValue === amount) {
        removeChange(changeTariff.tariffId);
      } else {
        updateChange(
          {
            cycleId,
            newTariff: inputValue,
            tariffId,
            typeTariff: tariffType,
          },
          changeTariff.tariffId,
          tariffType
        );
      }
      return;
    }

    addChange({
      cycleId,
      newTariff: inputValue,
      tariffId,
      typeTariff: tariffType,
    });
  };

  return (
    <>
      <input
        type="number"
        className="number-input text-center w-fit h-full py-2 outline-deep-blue bg-transparent"
        value={inputValue}
        onChange={(e) => {
          setInputValue(e.target.value);
        }}
        onBlur={handleOnBlur}
      />
    </>
  );
};

export default TariffInput;
