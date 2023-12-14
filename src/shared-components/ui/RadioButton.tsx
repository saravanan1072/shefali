type OvalRadioProps = {
  id: string;
  name: string;
  label: string;
  value?: string;
  className?: string;
  checked?: boolean;
  onChange?: (...args: unknown[]) => unknown;
};

const OvalRadio = ({
  id,
  name,
  value,
  label,
  className,
  checked = false,
  onChange,
  ...props
}: OvalRadioProps): JSX.Element => {
  return (
    <div className="input-radio">
      <input
        type="radio"
        id={id}
        name={name}
        value={value}
        defaultChecked={checked}
        onChange={onChange}
        {...props}
        className={`radio-oval ${className}`}
      />
      <label htmlFor={id} className="radio-oval-label text-xs">
        {label}
      </label>

      <style jsx>
        {`
          .input-radio:last-child {
            margin-bottom: 11px;
          }
          .radio-oval,
          .radio-oval-label {
            cursor: pointer;
            vertical-align: middle;
            margin: 2px;
          }
          .radio-oval {
            -webkit-appearance: none;
            width: 12px;
            height: 12px;
            border: 1px solid black;
            border-radius: 50%;
            outline: none;
            margin-right: 10px;
          }
          .radio-oval:before {
            content: "";
            display: block;
            width: 80%;
            height: 80%;
            margin: 10% auto;
            border-radius: 50%;
          }
          .radio-oval:checked:before {
            background: #3dd6c4;
          }
        `}
      </style>
    </div>
  );
};

export default OvalRadio;
