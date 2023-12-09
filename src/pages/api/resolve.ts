import { resolveReferralLink } from "@/helpers/referrals";
import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {

  let referrer, campaign_id, referring;

  try {
    res.status(200).json(resolveReferralLink(req.query.ref as string));

  } catch (error) {
    return res.status(500).json(error);
  }


}