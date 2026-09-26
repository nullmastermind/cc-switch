import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface ApiKeyInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  label?: string;
  id?: string;
}

const ApiKeyInput: React.FC<ApiKeyInputProps> = ({
  value,
  onChange,
  placeholder,
  disabled = false,
  required = false,
  label = "API Key",
  id = "apiKey",
}) => {
  const { t } = useTranslation();
  const [showKey, setShowKey] = useState(false);

  const toggleShowKey = () => {
    setShowKey(!showKey);
  };

  return (
    <div className="space-y-2">
      <label htmlFor={id} className="block text-ui font-medium text-foreground">
        {label} {required && "*"}
      </label>
      <div className="relative">
        <Input
          type={showKey ? "text" : "password"}
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder ?? t("apiKeyInput.placeholder")}
          disabled={disabled}
          required={required}
          className="pr-8"
        />
        {!disabled && value && (
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={toggleShowKey}
            className="absolute right-0 top-0"
            aria-label={showKey ? t("apiKeyInput.hide") : t("apiKeyInput.show")}
          >
            {showKey ? <EyeOff size={16} /> : <Eye size={16} />}
          </Button>
        )}
      </div>
    </div>
  );
};

export default ApiKeyInput;
