import React from "react";
import { Switch } from "@/components/ui/switch";

interface PromptToggleProps {
  enabled: boolean;
  onChange: (enabled: boolean) => void;
  disabled?: boolean;
}

const PromptToggle: React.FC<PromptToggleProps> = ({
  enabled,
  onChange,
  disabled = false,
}) => {
  return (
    <Switch
      checked={enabled}
      disabled={disabled}
      onCheckedChange={onChange}
      className="data-[state=checked]:bg-emerald-500 dark:data-[state=checked]:bg-emerald-600"
    />
  );
};

export default PromptToggle;
