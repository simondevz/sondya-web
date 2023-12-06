import { useState } from "react";
import { MdExpandMore } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { categoryType } from "../../data/CategoryData";
import { serviceType } from "../../data/servicesData";
import { AdminGetCategoryType } from "../../redux/types/categories.types";

interface DropdownProps<T> {
  options: T[];
  click?: any;
  // click?: (option: T) => void;
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

// interface DropdownProps<T> {
//   options: T[];
// }

export const DropdownProducts = ({
  options,
  click,
}: DropdownProps<AdminGetCategoryType>) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
    setIsOpen(false);
    click(option);
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
        <div className="origin-top-right absolute right-0 w-full border-x-[2px]  bg-white font-[700] z-40">
          <div className="py-1">
            {options.map((option, index) => (
              <button
                key={index}
                className="block w-full px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-gray-900 border-t"
                onClick={() => handleOptionClick(option.name)}
              >
                {option.name}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export const DropdownServices = ({ options }: DropdownProps<serviceType>) => {
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
          {selectedOption || "Services"}{" "}
          <span className="text-2xl">
            <MdExpandMore />
          </span>
        </button>
      </div>
      {isOpen && (
        <div className="origin-top-right absolute right-0 w-full border-x-[2px]  bg-white font-[700] z-40">
          <div className="py-1">
            {options.map((option, index) => (
              <button
                key={index}
                className="block w-full px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-gray-900 border-t"
                onClick={() => handleOptionClick(option.service)}
              >
                {option.service}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export const DropdownMenuBar = ({ command }: any) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const handleOptionClick = (link1: string) => {
    navigate(link1);
    command();
    setIsOpen(false);
  };
  return (
    <div className="inline-block text-left">
      <div>
        <button
          type="button"
          className="inline-flex justify-center w-full px-4 py-2 items-start font-[700]"
          onClick={() => setIsOpen(!isOpen)}
        >
          All Category
          <span className="text-2xl">
            <MdExpandMore />
          </span>
        </button>
      </div>
      {isOpen && (
        <div className="w-full text-white">
          <div className="py-1">
            <button
              onClick={() => handleOptionClick("/products")}
              className="block w-full px-4 py-2"
            >
              Products
            </button>
            <button
              onClick={() => handleOptionClick("/services")}
              className="block w-full px-4 py-2"
            >
              Services
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export const DropdownMenuForLargeScreen = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const handleOptionClick = (link1: string) => {
    navigate(link1);
    setIsOpen(false);
  };
  return (
    <div className="relative flex flex-col text-left">
      <div>
        <button
          type="button"
          className="inline-flex justify-center w-full px-4 py-2 items-center"
          onClick={() => setIsOpen(!isOpen)}
        >
          All Category
          <span className="text-xl">
            <MdExpandMore />
          </span>
        </button>
      </div>
      {isOpen && (
        <div className="absolute top-12 text-white bg-black w-full">
          <div className="py-1">
            <button
              onClick={() => handleOptionClick("/products")}
              className="block w-full px-4 py-2"
            >
              Products
            </button>
            <button
              onClick={() => handleOptionClick("/services")}
              className="block w-full px-4 py-2"
            >
              Services
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
