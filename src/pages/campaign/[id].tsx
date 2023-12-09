import Campaign from "@/components/Campaign";
import Navbar from "@/components/Navbar";
import { useRouter } from 'next/router';

export default function CampaignPage() {
  const router = useRouter();

  return <Navbar>
    <Campaign refCode={router.query.ref as string}/>
  </Navbar>;

}