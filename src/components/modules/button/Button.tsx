import React, { forwardRef, useRef, useImperativeHandle } from "react";

import ButtonStyles from "./Button.module.css";

export interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  block?: boolean;
  className?: any;
  children?: React.ReactNode;
  disabled?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  shadow?: boolean;
  size?: "tiny" | "small" | "medium" | "large" | "xlarge";
  style?: React.CSSProperties;
  type?:
    | "primary"
    | "default"
    | "secondary"
    | "outline"
    | "dashed"
    | "link"
    | "text";
  danger?: boolean;
  htmlType?: "button" | "submit" | "reset";
  ref?: any;
  role?: string;
  textAlign?: "left" | "center" | "right";
}

export interface RefHandle {
  container: () => HTMLElement | null;
  button: () => HTMLButtonElement | null;
}

//TODO loading state
// eslint-disable-next-line react/display-name
const Button = forwardRef<RefHandle, ButtonProps>(
  (
    {
      block,
      className,
      children,
      danger,
      disabled = false,
      onClick,
      shadow = true,
      size = "tiny",
      style,
      type = "primary",
      htmlType,
      tabIndex,
      role,
      textAlign = "center",
      ...props
    }: ButtonProps,
    ref
  ) => {
    const containerRef = useRef<HTMLElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);

    useImperativeHandle(ref, () => ({
      container: () => {
        return containerRef.current;
      },
      button: () => {
        return buttonRef.current;
      },
    }));

    const classes = [ButtonStyles["sbui-btn"]];
    const containerClasses = [ButtonStyles["sbui-btn-container"]];

    classes.push(ButtonStyles[`sbui-btn-${type}`]);

    if (block) {
      containerClasses.push(ButtonStyles["sbui-btn--w-full"]);
      classes.push(ButtonStyles["sbui-btn--w-full"]);
    }

    if (danger) {
      classes.push(ButtonStyles["sbui-btn--danger"]);
    }

    if (shadow && type !== "link" && type !== "text") {
      classes.push(ButtonStyles["sbui-btn-container--shadow"]);
    }

    if (size) {
      classes.push(ButtonStyles[`sbui-btn--${size}`]);
    }

    if (className) {
      classes.push(className as string);
    }

    classes.push(ButtonStyles[`sbui-btn--text-align-${textAlign}`]);

    const RenderedButton = ({ children }: any) => (
      <button
        {...props}
        ref={buttonRef}
        className={classes.join(" ")}
        disabled={disabled && true}
        onClick={onClick}
        style={style}
        type={htmlType}
        tabIndex={tabIndex}
        role={role}
      >
        {children}
      </button>
    );

    return (
      <span ref={containerRef} className={containerClasses.join(" ")}>
        <RenderedButton>{children && <span>{children}</span>}</RenderedButton>
      </span>
    );
  }
);

export default Button;
