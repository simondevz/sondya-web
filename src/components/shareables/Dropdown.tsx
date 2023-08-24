import { useState } from "react";
import { MdExpandMore } from "react-icons/md";
import { categoryType } from "../../data/CategoryData";
import { productType } from "../../data/productsData";

interface DropdownProps<T> {
  options: T[];
}

export const Dropdown = ({ options }: DropdownProps<categoryType>) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block text-left">
      <div>
        <button
          type="button"
          className="inline-flex justify-center w-full border-x-[2px] border-[#EDB842] px-4 py-2 items-center font-[700]"
          onClick={() => setIsOpen(!isOpen)}
        >
          {selectedOption || "All Category "}{" "}
          <span className="text-2xl">
            <MdExpandMore />
          </span>
        </button>
      </div>
      {isOpen && (
        <div className="origin-top-right absolute right-0 w-full border-x-[2px] border-b-[2px] border-[#EDB842] bg-white font-[700]">
          <div className="py-1">
            {options.map((option, index) => (
              <button
                key={index}
                className="block w-full px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-gray-900 border-t"
                onClick={() => handleOptionClick(option.category)}
              >
                {option.category}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export const DropdownProducts = ({ options }: DropdownProps<productType>) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block text-left w-36">
      <div>
        <button
          type="button"
          className="inline-flex justify-center w-full border-b-[8px] border-[#EDB842] px-4 py-2 items-center font-[700]"
          onClick={() => setIsOpen(!isOpen)}
        >
          {selectedOption || "Products"}{" "}
          <span className="text-2xl">
            <MdExpandMore />
          </span>
        </button>
      </div>
      {isOpen && (
        <div className="origin-top-right absolute right-0 w-full border-x-[2px]  bg-white font-[700]">
          <div className="py-1">
            {options.map((option, index) => (
              <button
                key={index}
                className="block w-full px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-gray-900 border-t"
                onClick={() => handleOptionClick(option.product)}
              >
                {option.product}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
