const Input = ({
  reference,
  placeholder,
  value,
  onChange,
}: {
  reference?: any;
  placeholder: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <input
      ref={reference}
      className="px-4 py-2 m-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 shadow-sm"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  );
};

export default Input;
