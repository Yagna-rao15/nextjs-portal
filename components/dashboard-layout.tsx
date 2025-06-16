"use client";

import type React from "react";

import { useState } from "react";
import { usePathname } from "next/navigation";
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { ModeToggle } from "@/components/mode-toggle";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Bell,
  Building2,
  Calendar,
  ChevronDown,
  ClipboardList,
  CreditCard,
  FileText,
  Home,
  LogOut,
  MessageSquare,
  Package,
  Settings,
  User,
  Users,
} from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { logout } from "@/actions/logout";

interface DashboardLayoutProps {
  children: React.ReactNode;
  role?: "Student" | "Warden" | "Admin" | "Faculty";
  name?: string;
}

export function DashboardLayout({
  children,
  role: userRole = "Student",
  name: userName = "John Do",
}: DashboardLayoutProps) {
  const pathname = usePathname();
  const [notifications, setNotifications] = useState(3);

  const studentMenuItems = [
    { title: "Dashboard", icon: Home, href: "/student" },
    { title: "Room Information", icon: Building2, href: "/student/room" },
    { title: "Complaints", icon: MessageSquare, href: "/student/complaints" },
    { title: "Leave Applications", icon: FileText, href: "/student/leave" },
    { title: "Mess Management", icon: ClipboardList, href: "/student/mess" },
    { title: "Payments", icon: CreditCard, href: "/student/payments" },
    { title: "Calendar", icon: Calendar, href: "/student/calendar" },
  ];

  const wardenMenuItems = [
    { title: "Dashboard", icon: Home, href: "/warden" },
    { title: "Student Directory", icon: Users, href: "/warden/students" },
    { title: "Complaints", icon: MessageSquare, href: "/warden/complaints" },
    { title: "Room Inspection", icon: Building2, href: "/warden/inspection" },
    { title: "Leave Approvals", icon: FileText, href: "/warden/leave" },
    { title: "Attendance", icon: ClipboardList, href: "/warden/attendance" },
  ];

  const adminMenuItems = [
    { title: "Dashboard", icon: Home, href: "/admin" },
    { title: "User Management", icon: Users, href: "/admin/users" },
    { title: "Room Allocation", icon: Building2, href: "/admin/rooms" },
    { title: "Payments", icon: CreditCard, href: "/admin/payments" },
    { title: "Inventory", icon: Package, href: "/admin/inventory" },
    { title: "Settings", icon: Settings, href: "/admin/settings" },
  ];

  const menuItems =
    userRole === "Student" ? studentMenuItems : userRole === "Warden" ? wardenMenuItems : adminMenuItems;

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <Sidebar>
          <SidebarHeader className="flex items-center justify-center py-4">
            <div className="flex items-center gap-4 w-full px-6">
              <div className="rounded-md bg-transparent">
                <Image
                  src="/svnit-logo.png"
                  className="mx-auto my-auto"
                  alt="SVNIT Logo"
                  width={64}
                  height={64}
                  priority
                />
              </div>
              <div className="font-semibold text-center text-primary text-2xl mx-auto">Dashboard</div>
            </div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Main Menu</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {menuItems.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton asChild isActive={pathname === item.href} tooltip={item.title}>
                        <a href={item.href}>
                          <item.icon className="h-5 w-5" />
                          <span>{item.title}</span>
                        </a>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
          <SidebarFooter className="border-t">
            <div className="p-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="w-full justify-start gap-2">
                    <Avatar className="h-6 w-6">
                      <AvatarImage src="/placeholder.svg?height=32&width=32" />
                      <AvatarFallback>{userName.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <span className="truncate">{userName}</span>
                    <ChevronDown className="ml-auto h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <a href="/student/profile" className="flex items-center w-full">
                      <User className="mr-2 h-4 w-4" />
                      Profile
                    </a>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <a href="/feedback" className="flex items-center w-full">
                      <MessageSquare className="mr-2 h-4 w-4" />
                      Feedback
                    </a>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={logout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </SidebarFooter>
        </Sidebar>
        <div className="flex flex-col flex-1">
          <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="flex h-14 items-center px-4 gap-4">
              <SidebarTrigger />
              <div className="ml-auto flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  className="relative"
                  onClick={() => setNotifications(0)} // clears notifications
                >
                  <Bell className="h-5 w-5" />
                  {notifications > 0 && (
                    <Badge
                      className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0"
                      variant="destructive"
                    >
                      {notifications}
                    </Badge>
                  )}
                </Button>
                <ModeToggle />
              </div>
            </div>
          </header>
          <main className="flex-1 overflow-auto p-4 md:p-6">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  );
}
