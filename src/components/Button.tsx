import React from "react";

interface ButtonProps {
  text?: string;
  children?: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  isModal?: boolean;
  className?: string;
  href?: string;
}

const Button: React.FC<ButtonProps> = ({
  text,
  children,
  onClick,
  type = "button",
  isModal = false,
  className = "",
  href,
}) => {
  const handleClick = () => {
    if (onClick) onClick();
  };

  const content = children || text;

  if (href) {
    return (
      <a
        href={href}
        className={`tw-border-none tw-outline-none focus:tw-outline-none tw-flex tw-items-center tw-justify-center tw-w-[160px] tw-h-[40px] tw-bg-[#e37243] tw-text-[#f2f2f2] tw-rounded-[5px] tw-shadow-[0px_4px_4px_rgba(0,0,0,0.25)] tw-font-bold tw-text-[calc(12px+2*(100vw/1440))] tw-gap-2 tw-transition-all hover:tw-bg-[#d86a3e] active:tw-bg-[#c65f34] active:tw-translate-y-[2px]  ${className}`}
        onClick={isModal ? handleClick : undefined}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      type={type}
      onClick={handleClick}
      className={`tw-border-none tw-outline-none focus:tw-outline-none tw-flex tw-items-center tw-justify-center tw-w-[160px] tw-h-[40px] tw-bg-[#e37243] tw-text-[#f2f2f2] tw-rounded-[5px] tw-shadow-[0px_4px_4px_rgba(0,0,0,0.25)] tw-font-bold tw-text-[calc(12px+2*(100vw/1440))] tw-gap-2 tw-transition-all hover:tw-bg-[#d86a3e] active:tw-bg-[#c65f34] active:tw-translate-y-[2px]  ${className}`}
    >
      {content}
    </button>
  );
};

export default Button;
