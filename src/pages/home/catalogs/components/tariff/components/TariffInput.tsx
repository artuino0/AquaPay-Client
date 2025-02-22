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
  const [inputValue, setInputValue] = useState<string>(amount);
  const { addChange, changes, updateChange, removeChange } = ChangeStore();

  useEffect(() => {
    const changeTariff = changes.find(
      (change) => change.tariffId === tariffId && change.typeTariff === tariffType
    );
    setInputValue(changeTariff ? changeTariff.newTariff : amount);
  }, [amount, tariffId, tariffType, changes]);

  const handleOnBlur = () => {
    if (inputValue === amount) return;

    const changeTariff = changes.find(
      (change) => change.tariffId === tariffId && change.typeTariff === tariffType
    );

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
    <input
      type="number"
      className="number-input text-center w-fit h-full py-2 outline-deep-blue bg-transparent"
      value={inputValue}
      onChange={(e) => setInputValue(e.target.value)}
      onBlur={handleOnBlur}
    />
  );
};

export default TariffInput;
