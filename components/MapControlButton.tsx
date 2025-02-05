import { Tooltip } from "antd";
import React from "react";

interface MapControlButtonProps {
  title: string;
  onClick: () => void;
  icon: React.ReactNode;
  isActive: boolean;
}

const MapControlButton: React.FC<MapControlButtonProps> = ({
  title,
  onClick,
  icon,
  isActive,
}) => {
  return (
    <div>
      <Tooltip title={title} placement="left">
        <button
          onClick={onClick}
          className={`p-1 ${isActive ? 'bg-[#82CD47]' : 'bg-white'} text-white border-none rounded cursor-pointer mb-2.5 text-xl shadow-md`}
        >
          {icon}
        </button>
      </Tooltip>
    </div>
  );
};

export default MapControlButton;