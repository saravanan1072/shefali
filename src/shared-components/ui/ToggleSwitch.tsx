import React from "react";

const ToggleSwitch = ({
  label,
  type,
  switchOffText,
  switchOnText,
  name,
  handleToggle,
  value,
  error,
}: {
  label?: string;
  type: string;
  error?: string;
  switchOffText?: string;
  switchOnText?: string;
  name?: string;
  value?: boolean;
  handleToggle?: (...args: unknown[]) => unknown;
}) => {
  return (
    <div className="mb-2">
      <div className="text-center w-1/2 justify-between items-center flex">
        <div className="text-xs font-bold">{label}</div>
        <div className="toggle-switch w-1/6">
          <input
            type={type}
            className="checkbox"
            name={name}
            id={label}
            checked={value}
            onChange={handleToggle}
          />
          {/* <label className="label" htmlFor={label}>
          <span className="inner" data-before-content={switchOnText} data-after-content={switchOffText}/>
          <span className="switch" />
        </label> */}
        </div>
      </div>
      {error && (
        <p className="text-red-600 w-full text-left text-xs font-semibold">
          {error}
        </p>
      )}
      <style jsx>{`
        .toggle-switch {
          position: relative;
          display: inline-block;
        }
        .checkbox {
          // display: none;
        }
        .label {
          display: block;
          overflow: hidden;
          cursor: pointer;
          border: 0 solid #bbb;
          border-radius: 20px;
        }
        .inner {
          display: block;
          width: 200%;
          margin-left: -100%;
          transition: margin 0.3s ease-in 0s;
        }
        .inner:before,
        .inner:after {
          float: left;
          width: 50%;
          height: 18px;
          padding: 0;
          line-height: 18px;
          color: #3dd6c4;
          font-weight: bold;
          box-sizing: border-box;
        }
        .inner:before {
          content: attr(data-before-content);
          font-size: 10px;
          background-color: #c4f3ed;
          color: #3dd6c4;
        }
        .inner:after {
          content: attr(data-after-content);
          font-size: 10px;
          background-color: #d9d9d9;
          color: #808080;
        }
        .switch {
          display: block;
          width: 12px;
          height: 12px;
          margin: auto 0;
          margin-left: 2px;
          background: #3dd6c4;
          position: absolute;
          top: 0;
          bottom: 0;
          border-radius: 50%;
          transition: all 0.3s ease-in 0s;
        }
        .checkbox:checked + .label .inner {
          margin-left: 0;
        }
        .checkbox:checked + .label .switch {
          right: 0px;
        }
      `}</style>
    </div>
  );
};

export default ToggleSwitch;
