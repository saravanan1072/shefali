import { useEffect, useRef, useState } from "react";
import { useOnClickOutside } from "../../features/hooks";
import Icon from "../../lib/svg";
import { customizeEvent, noOperation } from "../../utils";

type DropdownProps = {
  name?: string;
  placeholder?: string;
  options: {
    id?: string;
    label?: string;
    value?: string;
    disabled?: boolean;
    selected?: boolean;
    hidden?: boolean;
  }[];
  width?: string;
  value?: string;
  error?: string;
  touched?: boolean;
  className?: string;
  height?: string;
  onChange?: (...args: unknown[]) => unknown;
  onBlur?: (...args: unknown[]) => unknown;
};

const Dropdown = ({
  name,
  placeholder,
  options,
  width,
  value,
  className,
  height,
  error,
  onBlur,
  touched,
  onChange,
}: DropdownProps): JSX.Element => {
  const ref = useRef();
  const [dropdown, setDropdown] = useState<boolean>(false);
  const [updatedOptions, setUpdatedOptions] = useState(options);
  const [selectedOption, setSelectedOption] = useState({});
  useEffect(() => {
    setUpdatedOptions(options);
  }, [options]);

  const showDropdown = (): void => {
    setDropdown(!dropdown);
  };

  // const onKeyDown = (event, option) => {
  //   const itemIndex = options.indexOf(option);
  //   if (event.keyCode === 13) {
  //     onClickOption(event, option);
  //   } else if (event.keyCode === 38) {
  //     if (itemIndex === 0) {
  //       setSelectedOption(options[options.length - 1]);
  //     } else {
  //       setSelectedOption(options[itemIndex - 1]);
  //     }
  //   } else if (event.keyCode === 40 || event.keyCode === 9) {
  //     if (itemIndex + 1 === options.length) {
  //       setSelectedOption(options[0]);
  //     } else {
  //       setSelectedOption(options[itemIndex + 1]);
  //     }
  //   }
  // };

  const onClickOption = (event, option): void => {
    let itemIndex;
    itemIndex = options.indexOf(option);
    const newSelect = options.filter((item, index) => index !== itemIndex);
    setUpdatedOptions(newSelect);
    customizeEvent(event, name, option?.value);
    onChange(event);
    setDropdown(false);
    onBlur(event);
  };

  /**
   * adding item-selected class on the basis of selectedOption?.label
   * because in some cases root component wants to override
   * the CSS Currently using this for update address
   */

  useOnClickOutside(ref, (e): void => {
    e.stopPropagation();
    if (dropdown) {
      showDropdown();
    }
  });

  return (
    <>
    <div className="mb-4">
      <div
        ref={ref}
        className={`rounded-md border text-sm relative dropdown-color ${className} width`}
        style={{ zIndex: dropdown ? 10 : "unset" }}
      >
        <div
          id={name}
          className={`relative flex items-center justify-between selectbox text-sm`}
          // onKeyDown={noOperation}
          onClick={(e) => {
            showDropdown();
            if (dropdown && !value) {
              onClickOption(e, value);
            }
          }}
          role="button"
          tabIndex={0}
        >
          <div>
            <p className="truncate text-primary">
              {value || placeholder}
            </p>
          </div>
          <div className="chevron">
            {dropdown ? (
              <Icon type="chevron-up" className="fill-current mr-2" />
            ) : (
              <Icon type="chevron-down" className="fill-current mr-2" />
            )}
          </div>
        </div>

        <div
          style={{ display: dropdown ? "block" : "none" }}
          className={`items background-white border rounded-md w-full absolute mt-3 py-2`}
        >
          {Array.isArray(updatedOptions) &&
            updatedOptions?.map((option, index) => (
              <div
                key={option.id}
                onClick={(event) => onClickOption(event, option)}
                // onKeyDown={(event) => onKeyDown(event, option)}
                role="button"
                tabIndex={0}
              >
                {option.label ? option.label : option.value}
              </div>
            ))}
        </div>
      </div>

      {touched && error && (
        <p className="text-red-600 w-full text-left text-xs font-semibold">
          {error}
        </p>
      )}
      </div>
      <style jsx>{`
      .width{
        width:${width}
      }
      .items{
        height:${height && height}px;
        overflow-y:scroll;
        background:#fff;
      }
        .items div {
          padding: 2px;
          padding-left:10px;
          cursor: pointer;
          font-size:14px;
        }
        .dropdown-color{
          background:#D9D9D9;
        }
        .selectbox {
          height: 35px;
          padding-left:10px;
        }

        @media screen and (max-width: 768px) {
        .width{
          width:100%;
        }
     @media screen and (max-height: 700px) {
        .chevron {
          position: absolute;
          right: 14px;
        }

      `}</style>
    </>
  );
};

export default Dropdown;
