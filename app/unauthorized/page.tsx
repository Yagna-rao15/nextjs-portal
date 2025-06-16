import { logout } from "@/actions/logout";
import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Home, LogOut, ShieldAlert } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function UnauthorizedPage() {
  return (
    <div className="flex min-h-screen items-center justify-center px-6 md:px-10 w-full bg-background text-foreground relative">
      {/* Theme Toggle */}
      <div className="absolute top-4 right-4">
        <ModeToggle />
      </div>

      <div className="w-full max-w-md">
        <Card className="p-6 md:p-8 border shadow-lg rounded-2xl">
          <CardHeader className="flex flex-col items-center text-center space-y-4">
            {/* Logo */}
            <Image src="/svnit-logo.png" alt="SVNIT Logo" width={96} height={96} className="mb-2" priority />

            <div className="flex items-center gap-2 pt-2 text-destructive">
              <ShieldAlert size={24} />
              <CardTitle className="text-2xl font-bold">Access Denied</CardTitle>
            </div>

            <p className="text-sm text-muted-foreground max-w-sm">
              You don&apos;t have permission to access this resource. If you believe this is an error, contact the
              administrator.
            </p>
          </CardHeader>

          <CardContent className="space-y-3">
            <Link href="/" className="w-full block">
              <Button variant="secondary" className="w-full">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Go Back
              </Button>
            </Link>

            <Link href="/student" className="w-full block">
              <Button className="w-full">
                <Home className="mr-2 h-4 w-4" />
                Go to Dashboard
              </Button>
            </Link>

            <form action={logout}>
              <Button type="submit" variant="destructive" className="w-full">
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </Button>
            </form>

            <div className="pt-4 border-t text-xs text-muted-foreground text-center">
              Need help? Contact{" "}
              <a href="mailto:admin@yagnarao.com" className="text-primary underline underline-offset-2">
                admin@yagnarao.com
              </a>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
