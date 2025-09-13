import React from "react";
import SoundPlayer from "./sounds";

export const useInteractionSound = () => {
  const soundProps = React.useMemo(
    () => ({
      onClick: () => SoundPlayer.play("click"),
      onMouseEnter: () => SoundPlayer.play("hover"),
    }),
    []
  );

  return soundProps;
};
