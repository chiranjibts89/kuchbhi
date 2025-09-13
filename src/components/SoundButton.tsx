import React from "react";

interface SoundButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "glass";
}

const playSound = (type: "click" | "hover") => {
  const audio = new Audio(
    type === "click"
      ? "https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3"
      : "https://assets.mixkit.co/active_storage/sfx/2571/2571-preview.mp3"
  );
  audio.volume = 0.2;
  audio.play().catch(() => {});
};

const SoundButton: React.FC<SoundButtonProps> = ({
  children,
  className = "",
  variant = "primary",
  onClick,
  onMouseEnter,
  ...props
}) => {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    playSound("click");
    onClick?.(e);
  };

  const handleMouseEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
    playSound("hover");
    onMouseEnter?.(e);
  };

  const baseStyles = {
    primary: "bg-gradient-to-r from-[#F8D991] to-[#F6B080] text-[#091D23]",
    secondary: "bg-white/10 backdrop-blur-md border border-white/20 text-white",
    glass: "bg-[#E1664C]/20 text-[#E1664C]",
  };

  return (
    <button
      className={`${baseStyles[variant]} px-4 py-2 rounded-full font-semibold transition-all duration-300 ${className}`}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      {...props}
    >
      {children}
    </button>
  );
};

export default SoundButton;
