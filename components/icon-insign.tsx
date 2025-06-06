import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

const insignVariants = cva("rounded-full flex items-center justify-center", {
  variants: {
    variant: {
      default: "bg-teal-100",
      success: "bg-green-100",
    },
    iconVariant: {
      default: "text-teal-700",
      success: "text-green-700",
    },
    size: {
      default: "p-2",
      sm: "p-1",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
});

const iconsVariants = cva("", {
  variants: {
    variant: {
      default: "text-gray-400",
      success: "text-green-600",
    },
    size: {
      default: "h-8 w-8",
      sm: "h-6 w-6",
    },
  },
  defaultVariants: {
    variant: "success",
    size: "default",
  },
});

type InsignProps = VariantProps<typeof insignVariants>;
type IconsProps = VariantProps<typeof iconsVariants>;

interface IconInsignProps extends InsignProps, IconsProps {
  icon: LucideIcon;
}

export const IconInsign = ({ icon: Icon, variant, size }: IconInsignProps) => {
  return (
    <div className={cn(insignVariants({ variant, size }))}>
      <Icon className={cn(iconsVariants({ variant, size }))} />
    </div>
  );
};