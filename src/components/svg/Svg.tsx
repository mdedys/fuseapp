import { ComponentPropsWithoutRef } from "react";

export interface SvgProps extends ComponentPropsWithoutRef<"svg"> {
  /** html class identifier */
  readonly className?: string;
  /** html children to render within component */
  readonly children?: React.ReactNode;
}

export default function Svg(props: SvgProps) {
  const { fill = "none", height, width, children, style, ...other } = props;
  return (
    <svg fill={fill} focusable="false" height={height} width={width} style={style} {...other}>
      {children}
    </svg>
  );
}
