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
import styles from "./styles/multiselect.module.css"
import ContainerSelect from "./components/ContainerSelect/ContainerSelect";

type Option = {
  value: string;
  label: string;
  icon?: React.ComponentType<{ value: any }>;
};

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

  const removeElement = (value: string) =>{
    const newSelected = selected.filter((slec)=> slec !== value)
    onChange(newSelected)
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <div className={styles.container}>
        <div className="flex flex-wrap max-w-[90%] gap-4">
          {selected.length > 0
            ? selected.map((slec) => <ContainerSelect remove={()=>removeElement(slec)} value={slec} />)
            : placeholder || "Select..."}
        </div>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={styles.btn}
          >
            +
          </Button>
        </PopoverTrigger>
      </div>
      <PopoverContent className="w-[100%] p-0">
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
                      {Icon && <Icon value={option.value} />}
                      {option.label}
                    </CommandItem>
                  );
                })}
              </CommandGroup>
            </ScrollArea>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
