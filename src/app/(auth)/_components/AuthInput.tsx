"use client";

import { JSX, ReactNode } from "react";

type AuthInputProps = {
  label: string;
  type?: string;
  placeholder?: string;
  rightIcon?: ReactNode;
  leftIcon?: ReactNode;
};

export default function AuthInput({
  label,
  type = "text",
  placeholder,
  rightIcon,
  leftIcon,
}: AuthInputProps): JSX.Element {
  return (
    <div className="mb-4">
      <label className="block text-sm mb-2">{label}</label>

      <div className="relative">
        {leftIcon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2">
            {leftIcon}
          </div>
        )}

        <input
          type={type}
          placeholder={placeholder}
          className={`w-full py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400
          ${leftIcon ? "pl-10" : "pl-4"} ${rightIcon ? "pr-10" : "pr-4"}`}
        />

        {rightIcon && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer">
            {rightIcon}
          </div>
        )}
      </div>
    </div>
  );
}
