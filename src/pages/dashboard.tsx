import ReferralActivity from "@/components/Dashboard/ReferralActivity";
import Leftbar from "@/components/Leftbar";

export default function DashboardPage() {
  return (
    <div className="flex justify-start h-screen">
      <Leftbar />
      <ReferralActivity />
    </div>
  );
}
