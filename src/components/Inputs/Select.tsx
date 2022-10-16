import { ChevronDownIcon } from "@heroicons/react/24/outline";
import ReactSelect from "react-select";
import { priorityColors } from "../../config/colors";
import { Priority } from "../../services/enum/todoListEnum";

type Option = { label: string; value: Priority };

type SelectProps = {
  name: string;
  label: string;
  value: string;
  options: Array<Option>;
  onChange: (value: string) => void;
};

const Select: React.FC<SelectProps> = ({
  name,
  label,
  value,
  options,
  onChange,
}) => {
  return (
    <div>
      <label
        data-cy="modal-add-priority-title"
        htmlFor={name}
        className="block text-sm font-medium text-gray-700"
      >
        {label}
      </label>
      <ReactSelect
        defaultValue={options[0]}
        formatOptionLabel={({ value, label }) => (
          <div
            data-cy="modal-add-priority-item"
            className="flex items-center gap-4"
          >
            <div
              className="w-5 h-5 rounded-full"
              style={{ backgroundColor: priorityColors[value] }}
            ></div>
            <div>{label}</div>
          </div>
        )}
        options={options}
        className="mt-1 block w-full rounded-md border-gray-300 text-base focus:border-primary focus:outline-none focus:ring-primary sm:text-sm"
        onChange={(e) => onChange(e?.value || "")}
        components={{
          DropdownIndicator: () => (
            <ChevronDownIcon
              data-cy="modal-add-priority-dropdown"
              className="w-4 h-4 mx-4"
            />
          ),
        }}
      />
    </div>
  );
};

export default Select;
