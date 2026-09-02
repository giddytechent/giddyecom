import { ThemeProvider } from "@/components/providers/theme-provider"
import { SidebarProvider } from "@/components/ui/sidebar";
import AppSidebar from "@/components/AppSidebar";
import { cookies } from "next/headers"
import Navbar from "@/components/Navbar";
import { requireAdmin } from '@/lib/requireAdmin'
import { QueryProvider } from "@/components/providers/query-provider";
import { ToastContainer } from "react-toastify";



export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  await requireAdmin()

  const cookieStore = await cookies()
  const defaultOpen = cookieStore.get("sidebar_state")?.value === "true"
  return (
    <QueryProvider>
      <div className="flex">
        <SidebarProvider defaultOpen={defaultOpen}>
          <AppSidebar />
          <main className="w-full">
            <Navbar />
            <div className="px-4">{children}</div>
          </main>
        </SidebarProvider>
      </div>
      <ToastContainer position="bottom-right" />
    </QueryProvider>
  );
}
