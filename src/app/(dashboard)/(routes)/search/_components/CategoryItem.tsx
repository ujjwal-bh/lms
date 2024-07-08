"use client"
import React from 'react'
import qs from "query-string"
import { cn } from '@/lib/utils'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'


interface IProps{
    label: string,
    value?: string
}
const CategoryItem = ({label, value}: IProps) => {

    const pathname = usePathname()
    const router = useRouter()
    const searchParams = useSearchParams()

    const currentCategoryId = searchParams.get("categoryId")
    const currentTitle = searchParams.get("title")

    const isSelected = currentCategoryId === value;

    const onClick = () => {
        const url  = qs.stringifyUrl({
            url: pathname,
            query: {
                title: currentTitle,
                categoryId: isSelected ? null: value,
            }
        }, {skipNull: true, skipEmptyString: true})
        router.push(url);
    }
  return (
   <button
   onClick={onClick}
   className={cn(
    "py-2 px-3 text-sm border border-slate-200 rounded-full flex items-center gap-x-1 hover:border-primary transition",
    // TODO : change style if active
    isSelected && "border-primary bg-primary/10 text-primary"
   )}
   >
<div className='truncate'>
    {label}
</div>
   </button>
  )
}

export default CategoryItem