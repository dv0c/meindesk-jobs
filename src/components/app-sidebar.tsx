"use client"

import {
  BarChart2,
  CheckSquare,
  ClipboardList,
  CreditCard,
  GalleryVerticalEnd,
  Globe,
  HelpCircle,
  Package,
  Settings,
  ShoppingCart,
  Users
} from "lucide-react"
import * as React from "react"
import { useSession } from "next-auth/react"

import { NavMain } from "@/components/nav-main"
import { NavProjects } from "@/components/nav-projects"
import { NavUser } from "@/components/nav-user"
import { TeamSwitcher } from "@/components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"

// This is sample data.
const data = {
  user: {
    name: "meindesk",
    email: "contact@meindesk.gr",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Meindesk",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
    // {
    //   name: "Acme Corp.",
    //   logo: AudioWaveform,
    //   plan: "Startup",
    // },
    // {
    //   name: "Evil Corp.",
    //   logo: Command,
    //   plan: "Free",
    // },
  ],
  navMain: [
    {
      title: "Websites",
      url: "/websites",
      icon: Globe,
      items: [
        {
          title: "My Websites",
          url: "/websites/list",
        },
        {
          title: "Request Changes",
          url: "/websites/changes",
        },
        {
          title: "Website Analytics",
          url: "/websites/analytics",
        },
      ],
    },
    {
      title: "Orders",
      url: "/orders",
      icon: ShoppingCart,
      items: [
        {
          title: "New Order",
          url: "/orders/new",
        },
        {
          title: "Order History",
          url: "/orders/history",
        },
        {
          title: "Packages",
          url: "/orders/packages",
        },
      ],
    },
    {
      title: "Tasks",
      url: "/tasks",
      icon: CheckSquare,
      items: [
        {
          title: "Add New Task",
          url: "/tasks/new",
        },
        {
          title: "View Tasks",
          url: "/tasks/list",
        },
        {
          title: "Task History",
          url: "/tasks/history",
        },
      ],
    },
    {
      title: "Billing",
      url: "/billing",
      icon: CreditCard,
      items: [
        {
          title: "Invoices",
          url: "/billing/invoices",
        },
        {
          title: "Payment Methods",
          url: "/billing/payment-methods",
        },
        {
          title: "Subscription",
          url: "/billing/subscription",
        },
      ],
    },
    {
      title: "Support",
      url: "/support",
      icon: HelpCircle,
      items: [
        {
          title: "Submit Ticket",
          url: "/support/new-ticket",
        },
        {
          title: "Knowledge Base",
          url: "/support/knowledge-base",
        },
        {
          title: "FAQs",
          url: "/support/faqs",
        },
      ],
    },
    {
      title: "Settings",
      url: "/settings",
      icon: Settings,
      items: [
        {
          title: "Account",
          url: "/settings/account",
        },
        {
          title: "Notifications",
          url: "/settings/notifications",
        },
        {
          title: "Security",
          url: "/settings/security",
        },
      ],
    },
  ],
  projects: [
    {
      name: "Customer Management",
      url: "/customers",
      icon: Users,
    },
    {
      name: "Service Packages",
      url: "/packages",
      icon: Package,
    },
    {
      name: "Order Management",
      url: "/orders",
      icon: ClipboardList,
    },
    {
      name: "User Analytics",
      url: "/analytics",
      icon: BarChart2,
    },
    {
      name: "System Settings",
      url: "/settings",
      icon: Settings,
    },
  ]
}



export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const user = useSession().data?.user
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
      </SidebarContent>
      <SidebarFooter>
        {user && (
          <NavUser user={user} />
        )}
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
