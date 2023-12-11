import React from "react";
import { motion } from "framer-motion";
type ButtonProps = {
  children: React.ReactNode;
  type?: "button" | "submit" | "reset";
  className?: string;
  leftIcon?: string;
  rightIcon?: string;
  onClick?: () => void;
  disabled?: boolean;
};
const ButtonMotion = ({
  children,
  type,
  className,
  onClick,
  leftIcon,
  rightIcon,
  disabled,
}: ButtonProps) => {
  return (
    <motion.button
      type={type}
      disabled={disabled}
      className={`flexCenter gap-3 px-4 py-3 rounded-xl text-sm font-medium max-md:w-full bg-primary-purple  ${
        className ?? "text-white"
      }`}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      exit={{ opacity: 0 }}
      onClick={onClick}
      whileTap={{ scale: 0.9 }}
      whileHover={{ scale: 1.1 }}
    >
      {leftIcon && <img src={leftIcon} alt="leftIcon" width={20} height={20} />}
      {children}
      {rightIcon && (
        <img src={rightIcon} alt="rightIcon" width={20} height={20} />
      )}
    </motion.button>
  );
};

export default ButtonMotion;
