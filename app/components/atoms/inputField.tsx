import React, { useState } from "react";

interface CustSettingFieldProps {
  text?: string;
  label: string;
  type: string;
  placeholder?: string;
  regist?: any;
  defaultValue?: string;
}

const InputField = ({
  label,
  placeholder,
  defaultValue,
  type,
  regist,
}: CustSettingFieldProps) => {
  const [value, setValue] = useState(defaultValue || "");
  const [characterCount, setCharacterCount] = useState(0);

  const handleOnChange = (e: any) => {
    setValue(e.target.value);
    setCharacterCount(e.target.value.length);
  };

  return (
    <div className="text-custBlack flex flex-col gap-0 w-full">
      <label className="font-semibold text-sm md:text-base mb-1">{label}</label>
      {type == "message" ? (
        <>
          <textarea
            placeholder={placeholder}
            {...regist}
            value={value}
            onChange={handleOnChange}
            required
            rows={4}
            maxLength={200}
            className="resize-none text-xs md:text-sm px-3 py-2 text-custBlack/70 rounded-md border active:outline-none focus:outline-none focus:border-custBlack/70 font-normal"
          />
          <p className="text-xs ms-auto">Characters: {characterCount} / 200</p>
        </>
      ) : (
         <input
          type={type}
          placeholder={placeholder}
          {...regist}
          value={value}
          onChange={handleOnChange}
          className="text-xs w-full md:text-sm px-3 py-2 text-custBlack/70 rounded-md border active:outline-none focus:outline-none focus:border-custBlack/70 font-normal"
        />
      )}
    </div>
  );
};

export default InputField;
