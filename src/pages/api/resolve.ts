import { resolveReferralLink } from "@/helpers/referrals";
import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {

  let referrer, campaign_id, referring;

  try {
    const { referrer, campaign_id, referring } = resolveReferralLink(req.query.ref as string);
    res.status(200).send(referrer);

  } catch (error) {
    return res.status(500).json(error);
  }


}