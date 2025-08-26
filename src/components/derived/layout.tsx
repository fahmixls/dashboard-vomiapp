import { Link, Outlet } from "@tanstack/react-router";
import { Home, Users, FileText, ReceiptText } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Layout() {
  const navItems = [
    { to: "/", label: "Home", icon: Home },
    { to: "/client", label: "Clients", icon: Users },
    { to: "/catalog", label: "Catalogs", icon: FileText },
    { to: "/invoice", label: "Invoices", icon: ReceiptText },
  ];

  return (
    <div className="h-screen mx-auto container flex flex-col">
      {/* Top navigation bar */}
      <header className="bg-card/40 backdrop-blur supports-[backdrop-filter]:bg-card/40">
        <div className="h-14 flex items-center justify-center px-6">
          <nav className="flex gap-4">
            {navItems.map((item) => (
              <TopNavLink
                key={item.to}
                to={item.to}
                icon={item.icon}
                label={item.label}
              />
            ))}
          </nav>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 overflow-y-auto p-6">
        <div className="container mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

function TopNavLink({
  to,
  label,
  icon: Icon,
}: {
  to: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}) {
  return (
    <Link
      to={to}
      activeOptions={{ exact: to === "/" }}
      activeProps={{
        className: "text-primary",
      }}
      inactiveProps={{
        className: "text-foreground/80 hover:text-foreground",
      }}
      preload="intent"
    >
      {({ isActive }) => (
        <Button
          variant={isActive ? "secondary" : "ghost"}
          className="gap-2 px-3"
        >
          <Icon className="h-4 w-4" />
          <span>{label}</span>
        </Button>
      )}
    </Link>
  );
}
