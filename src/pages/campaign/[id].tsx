import Campaign from "@/components/Campaign";
import Navbar from "@/components/Navbar";
import { useRouter } from 'next/router';

export default function CampaignPage() {
  const router = useRouter();
  const { id } = router.query;

  return <Navbar>
    <Campaign refCode={router.query.ref as string} campaign={id as string}/>
  </Navbar>;

}