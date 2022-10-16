type Option = { text: string; value: string };

type SelectProps = {
  name: string;
  label: string;
  value: string;
  options: Array<Option>;
  dataCy?: {
    label: string;
    input: string;
  };
  onChange: (value: string) => void;
};

const Select: React.FC<SelectProps> = ({
  name,
  label,
  value,
  options,
  dataCy,
  onChange,
}) => {
  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <select
        id={name}
        name={name}
        value={value}
        className="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-primary focus:outline-none focus:ring-primary sm:text-sm"
        onChange={(value) => onChange(value.target.value)}
      >
        {options.map((option, index) => {
          return (
            <option key={index} value={option.value}>
              {option.text}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default Select;
