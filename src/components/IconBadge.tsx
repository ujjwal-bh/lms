import React from 'react'
import { LucideIcon } from 'lucide-react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'


const backgroundVariants = cva(
    "rounded-full flex items-center justify-center",
    {
        variants: {
            variant: {
                default: "bg-primary",
                success: "bg-emerald-100"
            }, 
            iconVariant: {
                default: "bg-primary",
                success: "text-emerald-700"
            },
            size: {
                default: "p-2",
                sm: "p-1"
            }
        },
        defaultVariants: {
            variant: "default",
            size: "default",
            iconVariant: "default"
        }
    }
)
const IconBadge = () => {
  return (
    <div>IconBadge</div>
  )
}

export default IconBadge