import RadioButton from "./RadioButton";

interface RadioListProps {
  options: {
    name?: string;
    id?: string;
    label?: string;
    value?: string;
    defaultChecked?: boolean;
  }[];
  name?: string;
  onChange?: (...args: unknown[]) => unknown;
}

const RadioList = ({
  options,
  name,
  onChange,
  ...props
}: RadioListProps): JSX.Element => {
  return (
    <>
      {options.map((radio) => (
        <RadioButton
          id={radio.id}
          name={name}
          label={radio.label}
          value={radio.value}
          onChange={onChange}
          checked={radio.defaultChecked}
          {...props}
        />
      ))}
    </>
  );
};

export default RadioList;
