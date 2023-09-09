import React from "react";

interface SwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
}

const Switch: React.FC<SwitchProps> = ({ checked, onChange }) => {
  const handleToggle = () => {
    onChange(!checked);
  };

  return (
    <label className="inline-flex items-center cursor-pointer">
      <div
        className={`relative w-12 h-6 rounded-full ${
          checked ? "bg-[#EDB842]" : "bg-gray-400"
        }`}
      >
        <input
          type="checkbox"
          className="hidden"
          checked={checked}
          onChange={handleToggle}
        />
        <div
          className={`toggle__dot left-1 top-1 absolute w-4 h-4 rounded-full bg-white shadow-md transform ${
            checked ? "translate-x-6" : ""
          }`}
        ></div>
      </div>
    </label>
  );
};

export default Switch;
