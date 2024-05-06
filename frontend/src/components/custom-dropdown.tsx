"use client"

import * as React from "react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

type CustomDropdownProps = {
    title: string;
    description: string;
    options: Array<{ value: string; label: string }>;
    defaultIndex: number;
    onOptionChange?: (value: string) => void;
    optionalText?: boolean;
  };
  

export function CustomDropdown({
    title,
    description,
    options,
    defaultIndex,
    optionalText,
    onOptionChange,
  }: CustomDropdownProps) {
  const [option, setOption] = React.useState(options[defaultIndex].value)

  const handleOptionChange = (value: string) => {
    setOption(value);
    if (onOptionChange) {
        onOptionChange(value);
    }
};

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">{title}{optionalText ? ' ' + option : ''}</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>{description}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup value={option} onValueChange={handleOptionChange}>
          {options.map((option) => (
            <DropdownMenuRadioItem key={option.value} value={option.value}>
              {option.label}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
