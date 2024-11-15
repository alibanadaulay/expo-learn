import React from "react";
import { Svg, Path, G } from "react-native-svg";

interface IconArrowBackProps {
  style?: object;
  width?: number;
  height?: number;
  color?: string;
}
const IconArrowBack: React.FC = ({
  style,
  width = 24,
  height = 24,
  color = "#000000",
}: IconArrowBackProps) => {
  return (
    <Svg fill={color} width={width} height={height} viewBox="0 0 24 24">
      <G data-name="Layer 2">
        <G data-name="arrow-back">
          <Path d="M19 11H7.14l3.63-4.36a1 1 0 1 0-1.54-1.28l-5 6a1.19 1.19 0 0 0-.09.15c0 .05 0 .08-.07.13A1 1 0 0 0 4 12a1 1 0 0 0 .07.36c0 .05 0 .08.07.13a1.19 1.19 0 0 0 .09.15l5 6A1 1 0 0 0 10 19a1 1 0 0 0 .64-.23 1 1 0 0 0 .13-1.41L7.14 13H19a1 1 0 0 0 0-2z" />
        </G>
      </G>
    </Svg>
  );
};

export default IconArrowBack;
