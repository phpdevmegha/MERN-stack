import { Link } from "react-router-dom";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
} from "@/components/ui/navigation-menu";
import ModeToggle from "@/components/ui/mode-toggle";

export default function NavBar() {
  return (
    <header className="w-full border-b bg-background sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto flex items-center justify-between p-4">
        {/* LOGO */}
        <Link to="/" className="text-2xl font-bold tracking-tight">
          To-Do App
        </Link>

        {/* DESKTOP NAVIGATION */}
        <div className="hidden md:flex items-center gap-6">
          <NavigationMenu>
            <NavigationMenuList className="flex gap-4">
              <NavigationMenuItem>
                <Link
                  to="/"
                  className="px-4 py-2 rounded-md hover:bg-accent transition"
                >
                  List
                </Link>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <Link
                  to="/add"
                  className="px-4 py-2 rounded-md hover:bg-accent transition"
                >
                  Add Task
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          <ModeToggle />
        </div>

        {/* MOBILE NAV */}
        <div className="md:hidden flex items-center gap-3">
          <ModeToggle />

          <Sheet>
            <SheetTrigger>
              <Menu className="h-7 w-7" />
            </SheetTrigger>

            <SheetContent side="left" className="p-6">
              <nav className="flex flex-col gap-4 mt-4 text-lg">
                <Link to="/" className="hover:underline">
                  List
                </Link>

                <Link to="/add" className="hover:underline">
                  Add Task
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
}
