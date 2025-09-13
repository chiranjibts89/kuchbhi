import React from "react";
import SoundPlayer from "../utils/sounds";

const ButtonWithSound = ({
  children,
  onClick,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    SoundPlayer.play("click");
    onClick?.(e);
  };

  const handleMouseEnter = () => {
    SoundPlayer.play("hover");
  };

  return (
    <button {...props} onClick={handleClick} onMouseEnter={handleMouseEnter}>
      {children}
    </button>
  );
};

export default ButtonWithSound;
