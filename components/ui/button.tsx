import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow-xs hover:bg-primary/90",
        destructive:
          "bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline:
          "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
        secondary:
          "bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80",
        ghost:
          "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
        link: "text-primary underline-offset-4 hover:underline",
        primary: "bg-blue-600 text-white hover:bg-blue-700 focus-visible:ring-blue-500/50",
         
         // Botón secundario (acción secundaria)
         secondaryLms: "bg-gray-600 text-white hover:bg-gray-700 focus-visible:ring-gray-500/50",
         
         // Botón de éxito (acciones positivas como "Guardar" o "Aprobar")
         success: "bg-green-600 text-white hover:bg-green-700 focus-visible:ring-green-500/50",
         
         // Botón de advertencia (acciones que requieren precaución)
         warning: "bg-yellow-500 text-black hover:bg-yellow-600 focus-visible:ring-yellow-500/50",
         
         // Botón de peligro (acciones destructivas como "Eliminar" o "Cancelar")
         danger: "bg-red-600 text-white hover:bg-red-700 focus-visible:ring-red-500/50",
         
         // Botón con borde (para acciones menos prominentes)
         outlineLms: "border border-gray-300 bg-transparent hover:bg-gray-50 dark:border-gray-600 dark:hover:bg-gray-700",
         
         // Botón fantasma (sin fondo, para acciones discretas)
         ghostLms: "hover:bg-gray-100 dark:hover:bg-gray-700",
         
         // Botón de enlace (para acciones que parecen enlaces)
         linkLms: "text-blue-600 underline-offset-4 hover:underline dark:text-blue-400",
 
         // variant ciberpunk
         neonBlue:
           "bg-[#00ccff] text-[#001a33] shadow-xs hover:bg-[#00b8e6] focus-visible:ring-[#00ccff]/50 dark:bg-[#00ccff]/80 dark:hover:bg-[#00b8e6]/90",
         neonPink:
           "bg-[#ff00ff] text-[#330033] shadow-xs hover:bg-[#e600e6] focus-visible:ring-[#ff00ff]/50 dark:bg-[#ff00ff]/80 dark:hover:bg-[#e600e6]/90",
         neonPurple:
           "bg-[#9900ff] text-[#1a0033] shadow-xs hover:bg-[#8800e6] focus-visible:ring-[#9900ff]/50 dark:bg-[#9900ff]/80 dark:hover:bg-[#8800e6]/90",
         neonGreen:
           "bg-[#00ff99] text-[#00331a] shadow-xs hover:bg-[#00e68a] focus-visible:ring-[#00ff99]/50 dark:bg-[#00ff99]/80 dark:hover:bg-[#00e68a]/90",
         neonOrange:
           "bg-[#ff6600] text-[#331a00] shadow-xs hover:bg-[#e65c00] focus-visible:ring-[#ff6600]/50 dark:bg-[#ff6600]/80 dark:hover:bg-[#e65c00]/90",
         cyberGradient:
           "bg-gradient-to-r from-[#00ccff] via-[#ff00ff] to-[#ff6600] text-white shadow-xs hover:opacity-90 focus-visible:ring-[#ff00ff]/50",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
