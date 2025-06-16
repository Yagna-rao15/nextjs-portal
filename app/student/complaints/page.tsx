import { Suspense } from "react";
import { DashboardLayout } from "@/components/dashboard-layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ComplaintForm from "./complaintForm";
import RedirectToLogin from "@/components/redirect";
import { ComplaintSkeleton } from "@/components/skeletons"; // placeholder UI
import { getUserEmailFromCookie } from "@/lib/jwt";
import ComplaintHistory from "./complainHistory";

export default async function ComplaintsPage() {
  const userEmail = await getUserEmailFromCookie();
  if (!userEmail) return <RedirectToLogin />;

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl text-center font-bold tracking-tight">Complaint Management</h1>
          <p className="text-muted-foreground text-center">
            Register and track your complaints about hostel facilities.
          </p>
        </div>

        <Tabs defaultValue="new" className="space-y-4 items-center">
          <TabsList>
            <TabsTrigger value="new">New Complaint</TabsTrigger>
            <TabsTrigger value="history">Complaint History</TabsTrigger>
          </TabsList>

          <TabsContent value="new" className="max-w-xl">
            <ComplaintForm email={userEmail} />
          </TabsContent>

          <TabsContent value="history" className="max-w-xl min-w-lg">
            <Suspense fallback={<ComplaintSkeleton />}>
              <ComplaintHistory email={userEmail} />
            </Suspense>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
