import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useOnClickOutside } from "../../features/hooks";
import { PopupData } from "../../interfaces";
import {showPopup } from "../../redux/common";
import { customizeEvent, isArrayOfObjects } from "../../utils";
import Input from "./Input";

type AutosuggestInputProps = {
  uniqueKey: string;
  name: string;
  value?: string;
  className?: string;
  width?: string;
  label?: unknown;
  forwardedRef?: any;
  error?: string;
  touched?: boolean;
  placeholder?: string;
  character?: string;
  pattern?: RegExp;
  maskingPattern?: any;
  onBlur?: (...args: unknown[]) => unknown;
  onChange?: (...args: unknown[]) => unknown;
  transformFn?: (_: string) => string;
  suggestions?: Array<any>;
  popupData?: PopupData;
  popupClasses?:any;
  canCreateNew?: boolean;
  canAddEntry?: boolean;
};

const Autosuggest = ({
  uniqueKey,
  label,
  placeholder,
  character,
  forwardedRef,
  onChange,
  onBlur,
  value,
  className,
  width,
  touched,
  error,
  transformFn,
  name,
  pattern,
  maskingPattern,
  suggestions,
  popupData,
  popupClasses,
  canCreateNew = false,
  canAddEntry = false,
}: AutosuggestInputProps): JSX.Element => {
  const dispatch = useDispatch();
  const createBtn = [`Create ${name}`];
  const ref = useRef();
  const [activeSuggestions, setActiveSuggestions] = useState<number>(0);
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false);
  const [userInput, setUserInput] = useState<string>("");
  let suggestionsListComponent: JSX.Element;

  const arrayOfObjects = isArrayOfObjects(suggestions);

  const getSuggestionsArray = () => {
    let suggestionArray = [];
    if (arrayOfObjects) {
      suggestions.map((el) => {
        suggestionArray.push(el.name);
      });
    } else {
      suggestionArray = suggestions;
    }
    return suggestionArray;
  };

  const suggestionHandler = (str: string) => {
    const suggestionArr = getSuggestionsArray()?.filter(
      (suggestion) => suggestion?.toLowerCase().indexOf(str) > -1
    );
    setFilteredSuggestions(suggestionArr);
    if (suggestionArr.length) {
      setShowSuggestions(true);
    } else {
      canAddEntry
        ? setFilteredSuggestions(createBtn)
        : setFilteredSuggestions(["No data!"]);
      setShowSuggestions(true);
    }
  };

  useOnClickOutside(ref, (e): void => {
    e.stopPropagation();
    if (showSuggestions) {
      setFilteredSuggestions([]);
      setShowSuggestions(false);
    }
  });

  const onChangeHandler = (e) => {
    onChange(e);
    const input = e.target.value;
    let str: string;
    if (character && input.includes(character)) {
      str = input.substring(input.indexOf(character) + 1);
      suggestionHandler(str);
    } else if (!character) {
      str = input;
      suggestionHandler(str);
    } else {
      setShowSuggestions(false);
    }
    setUserInput(e.target.value);
  };

  const onBlurHandler = (event) => {
    onBlur(event);
    if (!canCreateNew) {
      const suggestionArr = getSuggestionsArray();
      if (suggestionArr.indexOf(value) === -1) {
        customizeEvent(event, name, "");
        onChange(event);
      }
    }
  };

  const onClick = (e, enterClicked?: boolean) => {
    let val: string;
    if (e.target.innerText === `Create ${name}`) {
      val = "";
      customizeEvent(e, name, val);
      onChange(e);
      setFilteredSuggestions([]);
      setShowSuggestions(false);
      dispatch<any>(
        showPopup({
          title: popupData.title,
          description: popupData.description,
          btnArray: popupData.btnArray,
        },popupClasses)
      );
      return;
    }
    if (e.target.innerText === "No data!") {
      val = "";
      customizeEvent(e, name, val);
      onChange(e);
      setFilteredSuggestions([]);
      setShowSuggestions(false);
    }
    if (character) {
      const position = value.indexOf(character) + 1;
      if (enterClicked && position) {
        val =
          value.substring(0, position) + filteredSuggestions[activeSuggestions];
      } else {
        val = value.substring(0, position) + e.target.innerText;
      }
    } else if (enterClicked) {
      if (filteredSuggestions[activeSuggestions] === `Create ${name}`) {
        val = "";
        customizeEvent(e, name, val);
        onChange(e);
        setFilteredSuggestions([]);
        setShowSuggestions(false);
        dispatch<any>(
          showPopup({
            title: popupData.title,
            description: popupData.description,
            btnArray: popupData.btnArray,
          })
        );
        return;
      }
      val = filteredSuggestions[activeSuggestions];
    } else {
      val = e.target.innerText;
    }
    customizeEvent(e, name, val);
    onChange(e);
    setFilteredSuggestions([]);
    setShowSuggestions(false);
  };

  const onKeyDown = (e) => {
    if (e.keyCode === 13) {
      onClick(e, true);
    } else if (e.keyCode === 38) {
      if (activeSuggestions === 0) {
        setActiveSuggestions(filteredSuggestions.length - 1);
      } else {
        setActiveSuggestions(activeSuggestions - 1);
      }
    } else if (e.keyCode === 40 || e.keyCode === 9) {
      if (activeSuggestions + 1 === filteredSuggestions.length) {
        setActiveSuggestions(0);
      } else {
        setActiveSuggestions(activeSuggestions + 1);
      }
    }
  };

  if (showSuggestions && userInput) {
    if (filteredSuggestions.length) {
      suggestionsListComponent = (
        <ul className={`border rounded-lg bg-white py-1 w-full md:w-1/2`}>
          {filteredSuggestions.map((suggestion, index) => {
            return (
              <a
                className={`${
                  index === activeSuggestions && suggestion !== "No data!"
                    ? "bg-blue-200"
                    : ""
                } ${
                  suggestion === "No data!" && "bg-gray-200"
                } block pl-2 cursor-pointer text-sm`}
                key={suggestion}
                onClick={onClick}
                onKeyDown={onKeyDown}
                role="button"
                tabIndex={0}
              >
                {suggestion}
              </a>
            );
          })}
        </ul>
      );
    }
  }

  return (
    <>
      <div ref={ref}>
        <Input
          key={uniqueKey}
          label={label}
          placeholder={placeholder}
          // forwardedRef={forwardedRef}
          autoSuggest={showSuggestions}
          suggestionList={suggestionsListComponent}
          onChange={onChangeHandler}
          onKeyDown={onKeyDown}
          onBlur={onBlurHandler}
          value={value}
          name={name}
          width={width}
          touched={touched}
          error={error}
        />
      </div>
    </>
  );
};

export default Autosuggest;
