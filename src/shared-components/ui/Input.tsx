import { useState } from "react";

type InputProps = {
  name: string;
  // type?: 'text' | 'number' | 'password' | 'email' | 'date';
  type?: string;
  value?: string;
  label?: unknown;
  autoSuggest?: boolean;
  suggestionList?: JSX.Element;
  width?: string;
  error?: string;
  touched?: boolean;
  placeholder?: string;
  pattern?: RegExp;
  maskingPattern?: any;
  autoComplete?: string;
  className?: string;
  disabled?: boolean;
  maxLength?: number;
  disablePaste?: boolean;
  onBlur?: (...args: unknown[]) => unknown;
  onChange?: (...args: unknown[]) => unknown;
  onKeyDown?: (...args: unknown[]) => unknown;
};

const Input = ({
  name,
  label,
  type = "text",
  value,
  autoSuggest,
  suggestionList,
  width,
  error,
  placeholder,
  touched = false,
  className,
  maxLength,
  pattern,
  maskingPattern,
  onChange,
  onKeyDown,
  onBlur,
  autoComplete = "off",
  disablePaste,
  disabled = false,
  ...props
}: InputProps): JSX.Element => {
  const [keycode, setKeycode] = useState();
  const handleKeyPress = (event: any) => {
    const startPos = event.target.selectionStart;
    setKeycode(event.which);
    if (event.which === 32 && startPos === 0) {
      event.preventDefault();
      return;
    }

    if (type === "number") {
      if (["e", "E", "+", "-"].includes(event.key)) {
        event.preventDefault();
        return;
      }
    }
    if (typeof onKeyDown === "function") onKeyDown(event);
  };

  return (
    <>
      <div className="input-div">
        <div className={`${label && "flex "}`}>
          {label && <label className="mr-2">{label}</label>}
          <input
            className={`${className} input text-sm ${
              disabled && !(error && touched) && "class-disable"
            } ${error && touched ? "border-error bg-red-200" : "border-color"}`}
            id={name}
            name={name}
            type={type}
            placeholder={placeholder}
            disabled={disabled}
            onChange={(e) => onChange(e)}
            onKeyDown={handleKeyPress}
            onPaste={
              disablePaste
                ? (e) => e.preventDefault()
                : () => {
                    /** do nothing * */
                  }
            }
            autoComplete={autoComplete}
            onBlur={onBlur}
            value={value}
            {...props}
            maxLength={maxLength}
          />
          {autoSuggest && suggestionList}
        </div>
        {touched && error && (
          <p className="text-red-600 w-full text-left text-xs font-semibold">
            {error}
          </p>
        )}
      </div>

      <style jsx>{`
        .input {
          background: #d9d9d9;
          border-radius: 7px;
          height: 35px;
          padding-left: 10px;
          width: ${width};
        }
        .input-div {
          margin-bottom: 11px;
        }
        @media screen and (max-width: 768px) {
          .input {
            width: 100%;
          }
        }
      `}</style>
    </>
  );
};

export default Input;
