"use client";

/**
 * کامپوننت ورودی احراز هویت
 */
import { memo } from "react";

interface AuthInputProps {
    label: string;
    type?: string;
    value: string;
    onChange: (value: string) => void;
    error?: string;
    placeholder?: string;
    showToggle?: boolean;
    onToggle?: () => void;
    showPassword?: boolean;
}

export const AuthInput = memo(function AuthInput({
    label,
    type = "text",
    value,
    onChange,
    error,
    placeholder,
    showToggle,
    onToggle,
    showPassword,
}: AuthInputProps) {
    const inputType = showToggle ? (showPassword ? "text" : "password") : type;
    return (
        <div className="space-y-1.5">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                {label}
            </label>
            <div className="relative">
                <input
                    type={inputType}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder={placeholder}
                    className={`w-full rounded-lg border px-4 py-2.5 text-sm outline-none transition-all duration-200 focus:ring-2 ${
                        error
                            ? "border-red-500 focus:ring-red-300"
                            : "border-gray-300 focus:border-blue-500 focus:ring-blue-200 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                    }`}
                />
                {showToggle && (
                    <button
                        type="button"
                        onClick={onToggle}
                        className="absolute inset-y-0 inset-e-3 flex items-center text-gray-500 hover:text-gray-700 dark:text-gray-400"
                        aria-label="toggle password"
                    >
                        {showPassword ? "🙈" : "👁️"}
                    </button>
                )}
            </div>
            {error && (
                <p className="animate-[fadeIn_0.2s_ease-out] text-xs text-red-500">{error}</p>
            )}
        </div>
    );
});
