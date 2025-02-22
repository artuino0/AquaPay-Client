import { memo } from "react";
import { TariffElement } from "../../../../../../types/tariff.interface";
import TariffInput from "./TariffInput";

interface IProps {
  tariffsCubic: TariffElement[];
  cycleId: string;
}

const TariffList: React.FC<IProps> = memo(({ tariffsCubic, cycleId }) => {
  return (
    <table className="w-fit border-l-4 text-sm text-center h-fit">
      <thead>
        <tr className="bg-gray-100 border-b sticky top-0">
          <th className="px-6 py-3">m3</th>
          <th className="px-6">Domestico</th>
          <th className="px-6">Comercial</th>
        </tr>
      </thead>
      <tbody>
        {tariffsCubic?.map((tariff) => (
          <tr key={tariff._id} className="hover:bg-gray-50 even:bg-gray-50">
            <td className="px-6 border-r">{tariff.consumption}</td>
            <td className="border-r w-[100px]">
              <TariffInput
                tariffType="domestic"
                amount={tariff.domestic.$numberDecimal.toString()}
                cycleId={cycleId}
                tariffId={tariff._id}
              />
            </td>
            <td className="border-r">
              <TariffInput
                tariffType="commercial"
                amount={tariff.commercial.$numberDecimal.toString()}
                cycleId={cycleId}
                tariffId={tariff._id}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
});

export default TariffList;
