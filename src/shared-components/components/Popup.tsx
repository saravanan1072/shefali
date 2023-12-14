import { PopupData } from "../../interfaces";
import { hidePopup } from "../../redux/common";
import Button, { ButtonProps } from "../ui/Button";

type PopupProps = {
  messageData: PopupData;
  open: boolean;
  classAdditions?: Record<any, any>;
  closePopup?: () => void;
};

const Popup = ({
  messageData,
  open,
  classAdditions,
  closePopup,
}: PopupProps): JSX.Element => {
  const { title, description, content, btnArray } = messageData;

  return (
    <>
      {/* {open && (
                <div
                    className={`fixed inset-0 z-40 ${classAdditions && classAdditions.backdrop}`}
                />
            )} */}
      {open && (
        <div
          role="presentation"
          className={`popup-wrapper justify-center items-center flex overflow-x-hidden  overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none ${
            classAdditions && classAdditions.background
          }`}
          onClick={(): void => closePopup()}
        >
          <div
            role="presentation"
            className={`relative w-2/3 popup-container ${
              classAdditions && classAdditions.popupContainer
            }`}
            onClick={(e): void => e.stopPropagation()}
            onKeyDown={(e): void => e.stopPropagation()}
          >
            <div
              className={`border-0 h-auto shadow-lg relative flex flex-col mx-auto bg-white outline-none  popup ${
                classAdditions && classAdditions.popup
              }`}
            >
              <div
                className={`relative p-6 flex-auto break-words ${
                  classAdditions && classAdditions.contentDiv
                }
                            `}
              >
                {title && (
                  <p className="my-4 mx-8 md:mx-4 text-primary text-base font-bold text-center">
                    {title}
                  </p>
                )}
                {typeof description === "string" ? (
                  <p className="mt-4 text-sm text-blueGray-500 text-center break-words">
                    {description}
                  </p>
                ) : (
                  description
                )}
              </div>

              <div className="grid sm:grid-cols-1 gap-4 lg:grid-cols-2 md:grid-cols-2 mx-6">
                {content &&
                  content.map((data, index: number): JSX.Element => {
                    return (
                      <div className="flex-child" key={index.toString()}>
                        <span className="flex text-primary text-sm">
                          {data.label}
                        </span>
                        <span className="flex text-primary text-sm font-bold break-words">
                          {data.value}
                        </span>
                      </div>
                    );
                  })}
              </div>

              <div
                className={`flex items-center p-6 border-blueGray-200 rounded-b ${
                  content && content.length > 0
                    ? "justify-center space-x-4"
                    : "justify-evenly"
                }  ${classAdditions && classAdditions.buttonContainer}`}
              >
                {btnArray.length > 0 &&
                  btnArray.map(
                    (value: ButtonProps, index: number): JSX.Element => {
                      return (
                        <PopupButton
                          value={value}
                          closePopup={closePopup}
                          key={index.toString()}
                          buttonClass={classAdditions && classAdditions.button}
                        />
                      );
                    }
                  )}
              </div>
            </div>
          </div>
        </div>
      )}
      <style jsx>{`
        .popup-wrapper {
          background-color: rgba(0, 0, 0, 0.5);
        }
        .popup-container {
          max-height: 600px;
          overflow-y: scroll;
        }
        .popup {
          border-radius: 20px;
        }
        .flex-child {
          flex: 1;
        }
        .flex-child:first-child {
          margin-right: 20px;
        }
        @media screen and (max-width: 768px) {
          .popup-container {
            max-height: 700px;
          }
        }
      `}</style>
    </>
  );
};

type PopupButtonProps = {
  value: ButtonProps;
  buttonClass?: string;
  closePopup?: () => void;
};

export const PopupButton = ({
  value,
  buttonClass = "",
  closePopup,
}: PopupButtonProps): JSX.Element => {
  const handleClick = () => {
    const onClick = value.onClick || closePopup;
    onClick();
  };

  return (
    <div className={`${buttonClass}`}>
      <Button
        className={value.className}
        type={value.type}
        onClick={handleClick}
        disabled={value.disabled}
        size={value.size}
      >
        {value.children}
      </Button>
    </div>
  );
};

export default Popup;
