import React from "react";

export type ButtonProps = {
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  size?: "micro" | "small" | "medium" | "large";
  variant?: "primary" | "secondary" | "link";
  className?: string;
  onClick?: (...args: unknown[]) => unknown;
  children: React.ReactNode;
};
const Button = ({
  type = "button",
  disabled = false,
  size = "small",
  variant = "primary",
  className,
  onClick,
  children,
}: ButtonProps): JSX.Element => {
  return (
    <>
      <button
        type={type}
        className={`${variant!=="link"&& size} ${variant} btn-style flex items-center border-box ${className}`}
        onClick={onClick}
        disabled={disabled}
      >
        {children}
      </button>

      <style jsx>
        {`
          .btn-style {
            border-radius: 6px;
            font-size: 14px;
          }
          .primary {
            background-color: #3dd6c4;
            color: white;
          }
          .secondary {
            color: #3dd6c4;
            background-color: white;
            border: 1px solid #3dd6c4;
          }

          .link {
            color: #000;
            font-size: 16px;
          }

          .small {
            padding-left: 11px;
            padding-right: 11px;
            height: 32px;
          }

          .medium {
            padding: 0px 40px;
            height: 35px;
          }
          .large {
            padding-left: 48px;
            padding-right: 48px;
            height: 64px;
          }

          .small-btn {
            padding-top: 7px;
            padding-bottom: 7px;
          }

          button.btn {
            @apply rounded-full;

            &.medium {
              padding: 13px 32px;
            }
          }
        `}
      </style>
    </>
  );
};

export default Button;
