// MultiSelect Component with Framer Motion Border Beam
"use client"

import * as React from "react"
import { Check, ChevronDown, X } from "lucide-react"
import { motion } from "framer-motion"
import { cn } from "../lib/utils"
import { Button } from "./ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "./ui/command"
import { Badge } from "./ui/badge"

export interface Option {
  label: string
  value: string
}

interface MultiSelectProps {
  options: Option[]
  selected: string[]
  onChange: (selected: string[]) => void
  placeholder?: string
  className?: string
  maxDisplayItems?: number
  maxLabelLength?: number
  showBorderBeam?: boolean
  beamColor?: string
  beamDuration?: number
}

// Framer Motion Border Beam Component
const BorderBeam = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    size?: number
    duration?: number
    delay?: number
    colorFrom?: string
    colorTo?: string
  }
>(
  (
    {
      className,
      size = 200,
      duration = 8,
      delay = 0,
      colorFrom = "#ffaa40",
      colorTo = "#9c40ff",
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn("absolute inset-0 overflow-hidden rounded-[inherit]", className)}
        {...props}
      >
        <motion.div
          className="absolute inset-[-2px] rounded-[inherit]"
          style={{
            background: `conic-gradient(from 0deg, transparent, ${colorFrom}, ${colorTo}, transparent)`,
            maskImage: `radial-gradient(${size}px circle at var(--x, 0px) var(--y, 0px), transparent 70%, black 100%)`,
            WebkitMaskImage: `radial-gradient(${size}px circle at var(--x, 0px) var(--y, 0px), transparent 70%, black 100%)`,
          }}
          animate={{
            "--x": ["0px", "100%", "100%", "0px", "0px"],
            "--y": ["0px", "0px", "100%", "100%", "0px"],
          }}
          transition={{
            duration,
            delay,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </div>
    )
  }
)
BorderBeam.displayName = "BorderBeam"

const BorderBeamRotating = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    duration?: number
    colorFrom?: string
    colorTo?: string
  }
>(
  (
    {
      className,
      duration = 4,
      colorFrom = "#ffaa40",
      colorTo = "#9c40ff",
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn("absolute inset-0 overflow-hidden rounded-[inherit] pointer-events-none", className)}
        {...props}
      >
        <motion.div
          className="absolute inset-[-1px] rounded-[inherit]"
          style={{
            background: `conic-gradient(from 0deg, transparent 0deg, ${colorFrom} 90deg, ${colorTo} 180deg, transparent 270deg, transparent 360deg)`,
          }}
          animate={{
            rotate: 360,
          }}
          transition={{
            duration,
            repeat: Infinity,
            ease: "linear",
          }}
        />
        <div className="absolute inset-[1px] rounded-[inherit] bg-background" />
      </div>
    )
  }
)
BorderBeamRotating.displayName = "BorderBeamRotating"

export function MultiSelect({
  options,
  selected,
  onChange,
  placeholder = "Select items...",
  className,
  maxDisplayItems = 1,
  maxLabelLength = 15,
  showBorderBeam = false,
  beamColor = "#ffaa40",
  beamDuration = 4,
}: MultiSelectProps) {
  const [open, setOpen] = React.useState(false)

  const handleUnselect = (item: string) => {
    onChange(selected.filter((i) => i !== item))
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const input = e.target as HTMLInputElement
    if (input.value === "") {
      if (e.key === "Backspace" && selected.length > 0) {
        onChange(selected.slice(0, -1))
      }
      if (e.key === "Escape") {
        input.blur()
      }
    }
  }

  const selectables = options.filter((option) => !selected.includes(option.value))

  const truncateLabel = (label: string, maxLength: number) => {
    if (label.length <= maxLength) return label
    return label.substring(0, maxLength - 3) + "..."
  }

  return (
    <motion.div 
      className="relative"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className={cn(
                "justify-between min-h-8 h-auto py-1 px-2 relative overflow-hidden",
                showBorderBeam && "border-transparent",
                className
              )}
              onClick={() => setOpen(!open)}
            >
              <div className="flex items-center gap-1 flex-1 min-w-0 max-w-full">
                {selected.length === 0 && (
                  <span className="text-muted-foreground truncate text-xs md:text-sm">{placeholder}</span>
                )}
                
                {selected.length === 1 && (
                  <span className="text-xs md:text-sm truncate text-left max-w-full">
                    {truncateLabel(options.find((opt) => opt.value === selected[0])?.label || selected[0], 8)}
                  </span>
                )}
                
                {selected.length > 1 && (
                  <motion.span 
                    className="text-xs md:text-sm font-medium"
                    key={selected.length}
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 500, damping: 15 }}
                  >
                    {selected.length}
                  </motion.span>
                )}
              </div>
              <motion.div
                animate={{ rotate: open ? 180 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <ChevronDown className="h-3 w-3 md:h-4 md:w-4 shrink-0 opacity-50 ml-1" />
              </motion.div>
            </Button>
          </motion.div>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0" align="start" asChild>
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            <Command>
              <CommandInput placeholder="Search..." onKeyDown={handleKeyDown} />
              <CommandEmpty>No item found.</CommandEmpty>
              <CommandGroup className="max-h-64 overflow-auto">
                {/* Show selected items first */}
                {selected.length > 0 && (
                  <>
                    <div className="px-2 py-1.5 text-xs font-medium text-muted-foreground">
                      Selected ({selected.length})
                    </div>
                    {selected.map((value, index) => {
                      const option = options.find((opt) => opt.value === value)
                      return (
                        <motion.div
                          key={`selected-${value}`}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05 }}
                        >
                          <CommandItem
                            onSelect={() => handleUnselect(value)}
                            className="bg-muted/50"
                          >
                            <Check className="mr-2 h-4 w-4 opacity-100" />
                            <span className="flex-1 truncate">{option?.label || value}</span>
                            <X className="ml-2 h-4 w-4 text-muted-foreground" />
                          </CommandItem>
                        </motion.div>
                      )
                    })}
                    {selectables.length > 0 && (
                      <div className="px-2 py-1.5 text-xs font-medium text-muted-foreground border-t">
                        Available
                      </div>
                    )}
                  </>
                )}
                
                {/* Show available items */}
                {selectables.map((option, index) => (
                  <motion.div
                    key={option.value}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: (selected.length + index) * 0.05 }}
                  >
                    <CommandItem
                      onSelect={() => {
                        onChange([...selected, option.value])
                        setOpen(true)
                      }}
                    >
                      <Check className="mr-2 h-4 w-4 opacity-0" />
                      <span className="flex-1 truncate">{option.label}</span>
                    </CommandItem>
                  </motion.div>
                ))}
              </CommandGroup>
            </Command>
          </motion.div>
        </PopoverContent>
      </Popover>
      
      {showBorderBeam && (
        <BorderBeamRotating
          duration={beamDuration}
          colorFrom={beamColor}
          colorTo="#9c40ff"
        />
      )}
    </motion.div>
  )
}