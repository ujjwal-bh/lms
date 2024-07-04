"use client"
import React from 'react'
import { BarChart, Compass, Layout, List } from "lucide-react";
import SidebarItem from './SidebarItem';
import { usePathname } from 'next/navigation';


const GUEST_ROUTES  = [
    {
        icon: Layout,
        label: "Dashboard",
        href: "/"
    },
    {
        icon: Compass,
        label: "Browse",
        href: "/search"
    }
]

const TEACHER_ROUTES   = [
    {
        icon: List,
        label: "Courses",
        href: "/teacher/courses"
    },
    {
        icon: BarChart,
        label: "Analytics",
        href: "/teacher/analytics"
    }
]

const SidebarRoutes = () => {
    const pathname = usePathname()

    const routes = pathname?.includes("/teacher") ? TEACHER_ROUTES : GUEST_ROUTES;
  return (
    <div className="flex flex-col w-full">
        {
            routes.map(route=> (<SidebarItem
                key={route.href}
                icon={route.icon}
                label={route.label}
                href={route.href}
                />
            ))
        }
    </div>
)
}

export default SidebarRoutes