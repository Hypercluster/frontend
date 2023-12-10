import ReferralActivity from "@/components/Dashboard/ReferralActivity";
import Leftbar from "@/components/Leftbar";
import Topbar from "@/components/Topbar";

export default function DashboardPage() {
  return (
    <div className="flex justify-start h-screen">
      <Leftbar />
      <Topbar />
      <ReferralActivity />
    </div>
  );
}
