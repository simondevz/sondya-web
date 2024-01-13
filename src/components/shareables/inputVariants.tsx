import { useState, useEffect, useRef, useLayoutEffect } from "react";
import { MdOutlineAdd, MdClose } from "react-icons/md";
import slugify from "slugify";
import {
  AdminCreateProduct,
  AdminUpdateProduct,
} from "../../redux/types/products.types";

const InputVariants = ({
  setFormData,
  existingVariants,
}: {
  setFormData:
    | React.Dispatch<React.SetStateAction<AdminUpdateProduct>>
    | React.Dispatch<React.SetStateAction<AdminCreateProduct>>;
  existingVariants?: any;
}) => {
  const existingVariantsRef = useRef(existingVariants);
  const [numberOfVariations, setNumberOfVariations] = useState<number>(2);
  const [variations, setVariations] = useState<any>({});
  const variationsRef = useRef(variations);
  console.log(variations);

  useLayoutEffect(() => {
    existingVariantsRef.current = existingVariants;
  }, [existingVariants]);

  useLayoutEffect(() => {
    variationsRef.current = variations;
  }, [variations]);

  useEffect(() => {
    setFormData((prev: any) => {
      return {
        ...prev,
        variants: variationsRef.current,
        total_variants: Object.keys(variationsRef.current).length,
      };
    });
  }, [setFormData]);

  return (
    <div className="flex flex-col gap-3 shadow-md rounded-md p-3">
      <div className="font-[600] text-lg text-[#1D1F2C]">Variation</div>
      {Array(numberOfVariations)
        .fill(1)
        .map((_, index) => {
          return (
            <VariationType
              key={index}
              id={"variation_type_" + index}
              setVariations={setVariations}
              existingVariantType={
                Object.keys(existingVariantsRef.current || {})[index] || ""
              }
              existingVariantList={
                existingVariantsRef.current?.[
                  Object.keys(existingVariantsRef.current || {})[index]
                ] || []
              }
            />
          );
        })}
      <button
        type="button"
        onClick={() => setNumberOfVariations(numberOfVariations + 1)}
        className="bg-[#EDB84233] text-[#EDB842] p-[0.65rem] h-fit w-fit rounded-md flex flex-row gap-2 items-center"
      >
        <MdOutlineAdd />
        <span>Add Variant</span>
      </button>
    </div>
  );
};

const VariationType = ({
  id,
  setVariations,
  existingVariantType,
  existingVariantList,
}: {
  id: string;
  existingVariantType: string;
  existingVariantList: string[];
  setVariations: React.Dispatch<any>;
}) => {
  const [variant, setVariant] = useState<string>("");
  const [variantList, setVariantList] = useState<string[]>([]);
  const [variationType, setVariationType] = useState<string>("");

  useEffect(() => {
    if (existingVariantList.length) setVariantList(existingVariantList);
  }, [existingVariantList]);

  useEffect(() => {
    if (existingVariantType) setVariationType(existingVariantType);
  }, [existingVariantType]);

  useEffect(() => {
    setTimeout(() => {
      if (variationType)
        setVariations((prev: any) => {
          console.log("prev ==> ", prev);

          return {
            ...prev,
            [slugify(variationType, { replacement: "_" })]: variantList,
          };
        });
    }, 1000);
  }, [setVariations, variantList, variationType]);

  return (
    <div className="w-full flex flex-col gap-2">
      <div className="flex gap-2 self-end w-1/2">
        {variantList?.length ? (
          variantList?.map((variantString, index) => {
            return (
              <VariationButton
                key={index}
                variant={variantString}
                setVariantList={setVariantList}
              />
            );
          })
        ) : (
          <></>
        )}
      </div>
      <div className="w-full flex flex-row gap-3 items-end">
        <div className="text-[#777980] flex flex-col gap-2 text-sm w-1/2">
          <label htmlFor={id}>Variation Type</label>
          <input
            className="border p-2 rounded-md bg-[#F9F9FC]"
            name=""
            id={id}
            value={variationType}
            onChange={(event) => setVariationType(event?.target?.value)}
          />
        </div>
        <div className="text-[#777980] flex flex-col gap-2 text-sm w-1/2">
          <label htmlFor="">Variation</label>
          <input
            className="border p-2 rounded-md bg-[#F9F9FC]"
            type="text"
            placeholder="Variation. . ."
            value={variant}
            onChange={(event) => setVariant(event?.target?.value)}
          />
        </div>
        <button
          type={"button"}
          onClick={() => {
            const newList = [...variantList, variant];
            setVariantList(newList);
            setVariant("");
          }}
          className="bg-[#EDB84233] text-[#EDB842] p-[0.65rem] h-fit w-fit rounded-md"
        >
          <MdOutlineAdd />
        </button>
      </div>
    </div>
  );
};

const VariationButton = ({
  variant,
  setVariantList,
}: {
  variant: string;
  setVariantList: React.Dispatch<React.SetStateAction<string[]>>;
}) => {
  return (
    <span className="bg-[#EDB84233] flex gap-1 text-[#EDB842] px-[0.65rem] py-2 h-fit w-fit rounded-md">
      <span className="my-auto">{variant}</span>
      <MdClose
        onClick={() => {
          setVariantList((prevList) => {
            const newList = prevList.filter((item) => {
              return item !== variant;
            });
            return newList;
          });
        }}
        className="my-auto"
      />
    </span>
  );
};

export default InputVariants;
