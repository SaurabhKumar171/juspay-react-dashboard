import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarProvider,
  SidebarSeparator,
  SidebarTrigger,
} from "../ui/sidebar";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import ThemeToggle from "../ThemeToggle";
import { Bell, ChevronRight, LayoutGrid, Search } from "lucide-react";
import { cn } from "../../lib/utils";
import * as React from "react";
import * as Router from "react-router-dom";
import profileImg from "../../assets/profile.png";
import { dashboards, pages } from "../../data/nav.data";
import { useState } from "react";

function CollapsibleMenuItem({
  item,
  defaultOpen = false,
}: {
  item: any;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <>
      {/* Parent menu with toggle */}
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center w-full px-2 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground rounded-md transition-colors"
      >
        <ChevronRight
          className={`h-4 w-4 mr-2 transition-transform ${open ? "rotate-90" : ""}`}
        />
        <item.icon className="h-4 w-4 mr-2" />
        <span className="font-light">{item.label}</span>
      </button>

      {/* Submenu */}
      {open && item.children?.length > 0 && (
        <SidebarMenuSub>
          {item.children.map((child: any) => (
            <SidebarMenuSubButton key={child.label} asChild>
              <Router.Link
                to={child.to}
                className="flex items-center gap-2 pl-7 pr-2 py-1.5 text-sm font-light text-muted-foreground hover:text-foreground transition-colors"
              >
                <span>{child.label}</span>
              </Router.Link>
            </SidebarMenuSubButton>
          ))}
        </SidebarMenuSub>
      )}
    </>
  );
}

function RightRail() {
  return (
    <aside className="hidden xl:block w-80 shrink-0 border-l bg-card/50 backdrop-blur-sm">
      <div className="h-14 border-b px-4 flex items-center font-medium">
        Panel
      </div>
      <div className="p-4 space-y-6 overflow-y-auto h-[calc(100vh-3.5rem)]">
        <section>
          <h3 className="text-sm font-medium mb-3">Notifications</h3>
          <div className="space-y-3">
            {[
              { text: "You have a bug that needs attention" },
              { text: "New user registered" },
              { text: "You have a bug that needs attention" },
              { text: "Andi Lane subscribed to you" },
            ].map((n, i) => (
              <div
                key={i}
                className="flex items-start gap-3 rounded-md border p-3 bg-card"
              >
                <Bell className="h-4 w-4 text-blue-500 mt-0.5" />
                <p className="text-sm leading-5 text-muted-foreground">
                  {n.text}
                </p>
              </div>
            ))}
          </div>
        </section>
        <section>
          <h3 className="text-sm font-medium mb-3">Activities</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>Released a new version</li>
            <li>Submitted a bug</li>
            <li>Modified data in Project X</li>
            <li>Deleted a page in Project X</li>
          </ul>
        </section>
        <section>
          <h3 className="text-sm font-medium mb-3">Contacts</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>Natai Craig</li>
            <li>Drew Cano</li>
            <li>Orlando Diggs</li>
            <li>Andi Lane</li>
            <li>Kate Morrison</li>
          </ul>
        </section>
      </div>
    </aside>
  );
}

export default function DashboardLayout({
  children,
  title = "Dashboards",
  breadcrumb = ["Dashboards", "Default"],
}: {
  children: React.ReactNode;
  title?: string;
  breadcrumb?: string[];
}) {
  let location;
  try {
    location = Router.useLocation();
  } catch (e) {
    // Not inside a Router (e.g., during tests or isolated render). Fallback to root path.
    location = { pathname: "/" } as { pathname: string };
  }

  return (
    <SidebarProvider>
      <Sidebar variant="inset" collapsible="icon" className="bg-sidebar">
        <SidebarHeader className="px-3 py-3">
          <div className="flex items-center gap-2 px-1">
            <div className="h-7 w-7 bg-primary text-primary-foreground grid place-items-center font-bold rounded-full overflow-hidden">
              <img
                src={profileImg}
                alt="profile-img"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="text-base font-light">ByeWind</div>
          </div>
        </SidebarHeader>
        <SidebarContent>
          {/* Dashboards */}
          <SidebarGroup>
            <SidebarGroupLabel className="font-light">
              Dashboards
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {dashboards.map((item) => (
                  <SidebarMenuItem key={item.label}>
                    <SidebarMenuButton
                      asChild
                      isActive={location.pathname === item.to}
                    >
                      <Router.Link to={item.to} className="flex items-center">
                        <item.icon className="mr-2" />
                        <span className="font-light">{item.label}</span>
                      </Router.Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          <SidebarSeparator />

          {/* Pages */}
          <SidebarGroup>
            <SidebarGroupLabel className="font-light">Pages</SidebarGroupLabel>
            <SidebarMenu>
              {pages.map((item) => (
                <SidebarMenuItem key={item.label}>
                  <CollapsibleMenuItem item={item} />
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroup>
        </SidebarContent>

        <SidebarFooter className="px-2 pb-3">
          <Button variant="outline" className="w-full justify-start">
            <LayoutGrid className="mr-2 h-4 w-4" />
            Switch workspace
          </Button>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <header className="sticky top-0 z-20 h-14 border-b bg-background/60 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="h-full flex items-center gap-3 px-4">
            <SidebarTrigger />
            <div className="flex items-center text-sm text-muted-foreground">
              {breadcrumb.map((b, i) => (
                <React.Fragment key={b + i}>
                  <span
                    className={cn(
                      i === breadcrumb.length - 1 &&
                        "text-foreground font-medium"
                    )}
                  >
                    {b}
                  </span>
                  {i < breadcrumb.length - 1 && (
                    <ChevronRight className="mx-2 h-4 w-4" />
                  )}
                </React.Fragment>
              ))}
            </div>
            <div className="ml-auto flex items-center gap-2">
              <div className="relative hidden md:block">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search"
                  className="pl-8 w-28 sm:w-44 md:w-64 lg:w-80"
                />
              </div>
              <ThemeToggle />
              <Button
                variant="ghost"
                size="icon"
                aria-label="Notifications"
                className="h-8 w-8 rounded-full"
              >
                <Bell className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </header>
        <div className="flex min-w-0">
          <div className="flex-1 min-w-0">{children}</div>
          <RightRail />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
