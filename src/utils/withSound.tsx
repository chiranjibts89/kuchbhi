import React from "react";
import SoundPlayer from "./sounds";

type WithSoundProps = {
  onClick?: (e: React.MouseEvent<any>) => void;
  onMouseEnter?: (e: React.MouseEvent<any>) => void;
};

export const withSound = <P extends WithSoundProps>(
  WrappedComponent: React.ComponentType<P>
) => {
  return (props: P) => {
    const handleClick = (e: React.MouseEvent<HTMLElement>) => {
      SoundPlayer.play("click");
      props.onClick?.(e);
    };

    const handleMouseEnter = (e: React.MouseEvent<HTMLElement>) => {
      SoundPlayer.play("hover");
      props.onMouseEnter?.(e);
    };

    return (
      <WrappedComponent
        {...props}
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
      />
    );
  };
};
