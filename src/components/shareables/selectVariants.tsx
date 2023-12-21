import { useMemo } from "react";
import slugify from "slugify";

const SelectVariant = ({ variants }: { variants: any }) => {
  const labels = useMemo(() => {
    return Object.keys(variants);
  }, [variants]);

  return (
    <div className="grid grid-cols-2 gap-2 text-[#475156]">
      {labels?.length ? (
        labels?.map((labelStr: string, index: number) => {
          return (
            <div key={index} className="flex flex-col gap-2">
              <label htmlFor={labelStr}>{slugify(labelStr, " ")}</label>
              <div className="border-2 p-1 rounded-md overflow-x-hidden">
                <select name="" id={labelStr}>
                  {variants[labelStr].map((option: string, index: number) => {
                    return (
                      <option key={index} className="" value={option}>
                        {option}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>
          );
        })
      ) : (
        <span>No Variants</span>
      )}
    </div>
  );
};

export default SelectVariant;
