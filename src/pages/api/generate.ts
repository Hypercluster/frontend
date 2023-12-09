import { generateReferralLink, resolveReferralLink } from "@/helpers/referrals";
import { NextApiRequest, NextApiResponse } from "next";



// {
//   "referrer_address": "0x231231273y213132bfb3fbiunfiwnfewe",
//   "campaign_id": "donkey",
//  "referring_address": ""
// }

export default function handler(req: NextApiRequest, res: NextApiResponse) {

  const body = JSON.parse(req.body);
  if (!body.referrer_address || !body.campaign_id) {
    res.status(400).send("Missing referrer address or campaign id in body")
  } else {

    const link = generateReferralLink(body.referrer_address, body.campaign_id);
    res.status(200).send(link);
  }
}