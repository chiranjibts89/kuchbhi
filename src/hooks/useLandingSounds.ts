import { useCallback } from "react";

const useLandingSounds = () => {
  const playSound = useCallback((type: "click" | "hover") => {
    const audio = new Audio(
      type === "click"
        ? "https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3"
        : "https://assets.mixkit.co/active_storage/sfx/2571/2571-preview.mp3"
    );
    audio.volume = 0.2;
    audio.play().catch(() => {});
  }, []);

  const buttonProps = useCallback(
    (onClick?: () => void) => ({
      onClick: () => {
        playSound("click");
        onClick?.();
      },
      onMouseEnter: () => playSound("hover"),
    }),
    [playSound]
  );

  return {
    playSound,
    buttonProps,
  };
};

export default useLandingSounds;
