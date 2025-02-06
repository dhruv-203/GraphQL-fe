interface RadioBtnProps extends React.InputHTMLAttributes<HTMLInputElement> {
  value: string;
  groupName: string;
  labelText: string;
  className: string;
}

function RadioBtn({
  value,
  groupName,
  labelText,
  className,
  ...rest
}: RadioBtnProps) {
  return (
    <div
      className={`px-4 py-2 flex flex-row gap-3 max-w-[250px] border border-gray-600 peer items-center justify-center rounded-lg ${className}`}
    >
      <input
        type="radio"
        name={groupName}
        id={value}
        className={`w-4 h-4 accent-indigo-600 `}
        value={value}
        required
        {...rest}
      />
      <label
        htmlFor={value}
        className="text-white subpixel-antialised text-sm font-semibold"
      >
        {labelText}
      </label>
    </div>
  );
}

export default RadioBtn;
