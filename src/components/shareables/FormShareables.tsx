interface InputProp {
  id?: string;
  placeholder?: string;
  type?: React.HTMLInputTypeAttribute | undefined;
}
export const InputSondya = ({ placeholder, type = "text", id }: InputProp) => {
  return (
    <>
      <input
        className="border-[#9F9F9F] border-[1px] rounded-md p-2"
        type={type}
        placeholder={placeholder}
        id={id}
      />
    </>
  );
};

interface ButtonProp {
  text: string;
  type?: "submit" | "button" | "reset" | undefined;
}

export const ButtonSondya = ({ text, type = "submit" }: ButtonProp) => {
  return (
    <button type={type} className="bg-[#EDB842C9] p-2 rounded-md text-white">
      {text}
    </button>
  );
};

interface TextAreaProp {
  name?: string | undefined;
  id?: string | undefined;
  cols?: number | undefined;
  rows?: number | undefined;
  text?: string | undefined;
}

export const TextAreaSondya = ({
  name,
  cols = 30,
  rows = 3,
  id,
  text = "Input your text Here",
}: TextAreaProp) => {
  return (
    <textarea
      className="border-[#9F9F9F] border-[1px] rounded-md p-2"
      name={name}
      id={id}
      cols={cols}
      rows={rows}
    >
      {text}
    </textarea>
  );
};
