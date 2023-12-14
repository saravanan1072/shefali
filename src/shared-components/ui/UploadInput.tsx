import { useState } from "react";
import Icon from "../../lib/svg";
import { customizeEvent } from "../../utils";

type UploadInputProps = {
  name: string;
  // type?: 'text' | 'number' | 'password' | 'email' | 'date';
  type?: string;
  value?: any;
  placeholder?: string;
  acceptedFileTypes?: string;
  error?: string;
  touched?: boolean;
  pattern?: RegExp;
  maskingPattern?: any;
  className?: string;
  multiple?: boolean;
  onBlur?: (...args: unknown[]) => unknown;
  onChange?: (...args: unknown[]) => unknown;
  onKeyDown?: (...args: unknown[]) => unknown;
};

const UploadInput = ({
  name,
  type = "file",
  value,
  placeholder,
  acceptedFileTypes,
  error,
  touched = false,
  className,
  multiple,
  pattern,
  maskingPattern,
  onChange,
  onKeyDown,
  onBlur,
  ...props
}: UploadInputProps): JSX.Element => {
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

  const onFileChange = (event) => {
    customizeEvent(event, name, event.target.files[0]);
    onChange(event);
    onBlur(event);
  };

  return (
    <div className={` ${className} file-upload`}>
      <input
        className={`upload-input text-sm `}
        id={name}
        name={name}
        accept={acceptedFileTypes}
        type={type}
        onChange={onFileChange}
        onKeyDown={handleKeyPress}
        onBlur={onBlur}
        value={null}
        {...props}
        multiple={multiple}
      />
      <div className="custom-upload py-2 px-1">
        <Icon type="upload" className="mr-1" />
        <p>{placeholder}</p>
      </div>
      {value && typeof value === "string" ? (
        <p className="text-xs pt-2">{value}</p>
      ) : (
        <p className="text-xs pt-2">{value.name}</p>
      )}
      {touched && error && (
        <p className="text-red-600 w-full text-left text-xs font-semibold">
          {error}
        </p>
      )}
      <style jsx>{`
        .file-upload {
          position: relative;
          margin-bottom: 11px;
          display: inline-block;
        }
        .upload-input {
          position: relative;
          border-radius: 6px;
          opacity: 0;
          width: 100%;
          height: 35px;
          z-index: 2;
          cursor: pointer;
        }
        .custom-upload {
          background: #c4f3ed;
          position: absolute;
          top: 0;
          left: 0;
          width: 40%;
          color: #3dd6c4;
          font-size: 14px;
          border-radius: 6px;
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1;
        }
      `}</style>
    </div>
  );
};

export default UploadInput;
