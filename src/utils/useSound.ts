import { useCallback } from "react";
import SoundPlayer from "./sounds";

export const useSound = () => {
  const withSound = useCallback(
    (onClick?: (e: React.MouseEvent) => void) => ({
      onClick: (e: React.MouseEvent) => {
        SoundPlayer.play("click");
        onClick?.(e);
      },
      onMouseEnter: () => {
        SoundPlayer.play("hover");
      },
    }),
    []
  );

  return { withSound };
};
