type InputProps = {
  name: string;
  label: string;
  value: string;
  placeholder: string;
  type?: "text" | "number";
  dataCy?: {
    label: string;
    input: string;
  };
  onChange: (value: string) => void;
};

const Input: React.FC<InputProps> = ({
  name,
  label,
  value,
  type = "text",
  placeholder,
  dataCy,
  onChange,
}) => {
  return (
    <div>
      <label
        data-cy={dataCy?.label}
        htmlFor={name}
        className="block text-sm font-medium text-gray-700"
      >
        {label}
      </label>
      <div className="mt-1">
        <input
          data-cy={dataCy?.input}
          type={type}
          name={name}
          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
          placeholder={placeholder}
          value={value}
          onChange={(value) => onChange(value.target.value)}
        />
      </div>
    </div>
  );
};

export default Input;
