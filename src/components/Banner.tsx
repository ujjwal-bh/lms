import { cn } from '@/lib/utils'
import { cva , type VariantProps} from 'class-variance-authority'
import { AlertTriangle, CheckCircleIcon } from 'lucide-react'
import React from 'react'


const bannerVariants = cva(
    "border flex p-4 text-sm items-center w-full",
    {
        variants: {
            variant: {
                warning: "bg-yellow-200/80 border-yellow-30 text-primary",
                success: "bg-emerald-700 border-emerald-800 text-secondary"
            }
        },
        defaultVariants: {
            variant: "warning"
        }
    }
)

interface IProps extends VariantProps<typeof bannerVariants>{
label: string
}

const iconMap = {
    warning: AlertTriangle,
    success: CheckCircleIcon
}
const Banner = ({label, variant}: IProps) => {
    const Icon = iconMap[variant || "warning"]
  return (
    <div className={cn(bannerVariants({variant}))}>
        <Icon className='h-4 w-4 mr-2'/>
        {label}
    </div>
  )
}

export default Banner