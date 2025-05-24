import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Calendar, 
  Home, 
  Brain, 
  User, 
  FileText,
  Sunset,
  Activity
} from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
} from "@/components/ui/sidebar";
import UserMenu from './UserMenu';

const menuItems = [
  {
    title: "Home",
    path: "/",
    icon: Home,
  },
  {
    title: "Journal",
    path: "/journal",
    icon: FileText,
  },
  {
    title: "Triggers",
    path: "/triggers",
    icon: Brain,
  },
  {
    title: "Mindfulness",
    path: "/mindfulness",
    icon: Sunset,
  },
  {
    title: "Therapy",
    path: "/therapy",
    icon: User,
  },
  {
    title: "Biometrics",
    path: "/biometrics",
    icon: Activity,
  },
  {
    title: "Calendar",
    path: "/calendar",
    icon: Calendar,
  }
];

export function AppSidebar() {
  const location = useLocation();

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center gap-2 px-4 py-2">
          <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
            <Brain className="text-white" size={20} />
          </div>
          <div>
            <h2 className="text-lg font-semibold">Serenity</h2>
            <p className="text-xs text-muted-foreground">DBT Recovery Guide</p>
          </div>
        </div>
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild isActive={isActive}>
                      <Link to={item.path} className="flex items-center gap-3">
                        <item.icon size={20} />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      
      <SidebarFooter>
        <UserMenu />
        <div className="px-4 py-3 text-xs text-muted-foreground text-center">
          Serenity v1.0 - Your path to recovery
        </div>
      </SidebarFooter>
    </Sidebar>
  );
};
