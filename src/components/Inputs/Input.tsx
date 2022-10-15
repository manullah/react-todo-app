type InputProps = {
  name: string;
  label: string;
  value: string;
  placeholder: string;
  type?: "text" | "number";
  onChange: (value: string) => void;
};

const Input: React.FC<InputProps> = ({
  name,
  label,
  value,
  type = "text",
  placeholder,
  onChange,
}) => {
  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <div className="mt-1">
        <input
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
