type TextAreaProps = {
  name: string;
  value?: string;
  label?: unknown;
  placeholder?: string;
  error?: string;
  touched?: boolean;
  forwardedRef?: any;
  classname: string;
  width?: string;
  onBlur?: (...args: unknown[]) => unknown;
  onChange?: (...args: unknown[]) => unknown;
  disablePaste?: boolean;
  maxLength?: number;
  rows?: number;
  pattern?: RegExp;
  maskingPattern?: any;
  autoComplete?: string;
  readOnly?: boolean;
  onKeyDown?: (...args: unknown[]) => unknown;
};

const TextArea = ({
  name,
  value,
  label,
  placeholder = "type here",
  forwardedRef,
  error,
  touched = false,
  classname,
  width,
  onChange,
  disablePaste,
  maxLength,
  pattern,
  maskingPattern,
  onKeyDown,
  onBlur,
  autoComplete = "off",
  rows = 8,
  readOnly,
  ...props
}: TextAreaProps): JSX.Element => {
  const handleKeyPress = (event: any) => {
    const startPos = event.target.selectionStart;
    if (event.which === 32 && startPos === 0) {
      event.preventDefault();
      return;
    }

    if (typeof onKeyDown === "function") onKeyDown(event);
  };

  return (
    <>
      <div>
        <textarea
          className={`border textarea rounded-lg pt-2 ${classname} ${
            readOnly && "class-disable"
          }`}
          id={name}
          name={name}
          placeholder={placeholder}
          onChange={(e) => {
            onChange(e);
          }}
          onPaste={
            disablePaste
              ? (e) => e.preventDefault()
              : () => {
                  /** do nothing * */
                }
          }
          onKeyDown={handleKeyPress}
          autoComplete={autoComplete}
          onBlur={onBlur}
          value={value}
          maxLength={maxLength}
          readOnly={readOnly}
          rows={rows}
          {...props}
        />
        {touched && error && (
          <p className="text-red-600 w-full text-left text-xs font-semibold">
            {error}
          </p>
        )}
      </div>
      <style jsx>{`
        /* Make the label and field look identical on every browser */
        .textarea {
          resize: none;
          background: #d9d9d9;
          padding-left: 10px;
          outline: 0;
          font-size: 14px;
          width: ${width};
        }
        .class-disable {
          background: #c2c7d13d 0% 0% no-repeat padding-box;
          border: 1px solid #c2c7d17a;
          border-radius: 8px;
          opacity: 1;
        }
      `}</style>
    </>
  );
};

export default TextArea;
