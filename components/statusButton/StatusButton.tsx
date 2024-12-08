import React from "react";

interface StatusButtonProps {
  status: string;
  isOpen: boolean;
}

const StatusButton: React.FC<StatusButtonProps> = ({ status, isOpen }) => {
  const getStatusClass = () => {
    switch (status) {
      case "Up":
        return "bg-[#28a745]";
      case "Down":
        return "bg-[#ffc107]";
      case "Degraded":
        return "bg-[#dc3545]";
      default:
        return "";
    }
  };

  return (
    <button
      className={`w-[5px] h-[40px] rounded-sm transition-all ${
        isOpen ? "scale-125" : "hover:scale-125"
      } ${getStatusClass()}`}
    ></button>
  );
};

export default StatusButton;
