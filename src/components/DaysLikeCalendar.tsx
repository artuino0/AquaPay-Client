import React, { useState } from "react";

interface DaysLikeCalendarProps {
  title: string;
  selectedDays: number[];
  setSelectedDays: React.Dispatch<React.SetStateAction<number[]>>;
}

const DaysLikeCalendar: React.FC<DaysLikeCalendarProps> = ({
  title,
  selectedDays,
  setSelectedDays,
}) => {
  const handleDayClick = (day: number) => {
    if (selectedDays.includes(day)) {
      setSelectedDays(selectedDays.filter((d) => d !== day));
    } else {
      setSelectedDays([...selectedDays, day]);
    }
  };

  const daysArray = Array.from({ length: 31 }, (_, index) => index + 1);

  return (
    <div className="p-4 w-fit">
      <h2 className="text-lg font-semibold mb-4">
        Selecciona los días del mes:
      </h2>
      <div className="calendar grid grid-cols-7 gap-2">
        {daysArray.map((day) => (
          <div
            key={day}
            className={`day flex justify-center items-center border rounded cursor-pointer w-[38px] h-[38px] ${
              selectedDays.includes(day)
                ? "bg-blue-500 text-white"
                : "bg-gray-100"
            }`}
            onClick={() => handleDayClick(day)}
          >
            {day}
          </div>
        ))}
      </div>
      <h3 className="mt-4">Días seleccionados: {selectedDays.join(", ")}</h3>
    </div>
  );
};

export default DaysLikeCalendar;
