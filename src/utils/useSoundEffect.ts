import { useCallback } from "react";
import SoundPlayer from "./sounds";

export const useSoundEffect = () => {
  const addSound = useCallback(
    <
      T extends {
        onClick?: (e: React.MouseEvent) => void;
        onMouseEnter?: (e: React.MouseEvent) => void;
      }
    >(
      props: T = {} as T
    ) => {
      const originalClick = props.onClick;
      const originalMouseEnter = props.onMouseEnter;

      return {
        ...props,
        onClick: (e: React.MouseEvent): void => {
          SoundPlayer.play("click");
          originalClick?.(e);
        },
        onMouseEnter: (e: React.MouseEvent): void => {
          SoundPlayer.play("hover");
          originalMouseEnter?.(e);
        },
      };
    },
    []
  );

  return { addSound };
};
