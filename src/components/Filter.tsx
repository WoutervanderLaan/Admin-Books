import classNames from "classnames";
import { ChangeEvent, useState } from "react";

type FilterProps = {
  category: string;
  checkHandler: (e: ChangeEvent<HTMLInputElement>, category: string) => void;
};

const Filter = ({ category, checkHandler }: FilterProps) => {
  const [checked, setChecked] = useState(false);

  return (
    <label
      className={classNames(
        "flex flex-row gap-2 border-b-[1px] min-w-[240px] transition duration-200",
        { "border-blue": checked, "border-gray": !checked }
      )}
    >
      <input
        className="w-4 accent-blue-dark"
        type="checkbox"
        onChange={(e) => {
          setChecked(e.currentTarget.checked);
          checkHandler(e, category);
        }}
      />
      <span className="">{`${category
        .slice(0, 1)
        .toUpperCase()}${category.slice(1)}`}</span>
    </label>
  );
};

export default Filter;
