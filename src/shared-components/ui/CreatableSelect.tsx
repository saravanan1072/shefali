import Creatable from "react-select/creatable";
import { ActionMeta, OnChangeValue } from "react-select";

interface Options {
  id?: string;
  label?: string;
  value?: string;
  disabled?: boolean;
  selected?: boolean;
  hidden?: boolean;
}

const CreatableSelect = ({
  isClearable = true,
  isMulti = true,
  options,
  onChange,
  onBlur,
  placeholder,
  width,
  value,
  name,
  error,
  canCreateNew = true,
}: {
  isClearable?: boolean;
  isMulti?: boolean;
  options: Options[];
  onChange?: (...args: unknown[]) => unknown;
  onBlur?: (...args: unknown[]) => unknown;
  placeholder?: string;
  width: string;
  value: any;
  name: string;
  canCreateNew: boolean;
  error?: string;
}) => {

  const getCreatableVal = () => {
    const valArr = [];
    value &&
      value?.map((val) => {
        valArr.push({ value: val, label: val });
      });
    return valArr;
  };

  const customStyles = {
    option: (provided, state) => ({
      ...provided,
      paddingTop: 1,
      paddingBottom: 1,
      paddingLeft: 10,
      cursor: "pointer",
      fontSize: 14,
    }),
    container: (base) => ({
      ...base,
      width: width,
      zIndex: 5,
    }),
    dropdownIndicator: (base) => ({
      ...base,
      color: "black",
    }),
    indicatorSeparator: (base) => ({
      ...base,
      display: "none",
    }),
    control: (base) => ({
      ...base,
      minHeight: 35,
      fontSize: 14,
      cursor: "pointer",
    }),
  };

  return (
    <div className="creatable-style">
      <Creatable
        isClearable={isClearable}
        isMulti={isMulti}
        options={options}
        onBlur={onBlur}
        onChange={(
          newValue: OnChangeValue<Options, true>,
          actionMeta: ActionMeta<Options>
        ) => onChange(newValue, actionMeta)}
        placeholder={placeholder}
        styles={customStyles}
        value={getCreatableVal()}
        name={name}
        // noOptionsMessage={() => null}
        isValidNewOption={!canCreateNew ? () => false : () => true}
      />
      {error && (
        <p className="text-red-600 w-full text-left text-xs font-semibold">
          {error}
        </p>
      )}
      <style jsx>{`
        .creatable-style {
          margin-bottom: 11px;
        }
      `}</style>
    </div>
  );
};

export default CreatableSelect;
