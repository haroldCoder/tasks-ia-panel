"use client";
import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import "./styles/multiSelect.css";
import { ScrollArea } from "@/components/ui/scroll-area";

type Option = { value: string; label: string, icon?: React.ComponentType<{ value: any }> };

interface MultiSelectProps {
  options: Option[];
  selected: any[];
  onChange: (selected: any[]) => void;
  placeholder?: string;
}

export function MultiSelect({
  options,
  selected,
  onChange,
  placeholder,
}: MultiSelectProps) {
  const [open, setOpen] = React.useState(false);

  const handleSelect = (value: string) => {
    const newSelected = selected.includes(value)
      ? selected.filter((item) => item !== value)
      : [...selected, value];
    onChange(newSelected);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" className="w-[200px] cursor-pointer justify-between">
          {selected.length > 0
            ? `${selected.length} selected`
            : placeholder || "Select..."}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandList>
            <ScrollArea className="w-48 max-h-[150px] rounded-md border">
              <CommandGroup>
                {options.map((option) => {
                  const Icon = option.icon;
                  return (
                  <CommandItem
                    key={option.value}
                    onSelect={() => handleSelect(option.value)}
                    className="cursor-pointer"
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        selected.includes(option.value)
                          ? "opacity-100"
                          : "opacity-0"
                      )}
                    />
                    {
                      Icon &&
                      <Icon value={option.value} />
                    }
                    {option.label}
                  </CommandItem>
                )})}
              </CommandGroup>
            </ScrollArea>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
