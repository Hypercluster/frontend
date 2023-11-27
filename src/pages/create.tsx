import BusinessNavbar from "@/components/BusinessNavbar";
import Leftbar from "@/components/Leftbar";

export default function CreatePage() {
  return (
    <BusinessNavbar>
      <Leftbar />
      <div className="mx-16 mt-3 flex-1"></div>
    </BusinessNavbar>
  );
}
