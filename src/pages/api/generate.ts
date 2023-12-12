import { generateReferralLink, resolveReferralLink } from "@/helpers/referrals";
import { NextApiRequest, NextApiResponse } from "next";



export default function handler(req: NextApiRequest, res: NextApiResponse) {

  if (!req.headers['api_key'] || req.headers['api_key'] !== "8Tbinn8rPEMu1xKpyuukaAGLqOfmRWaL")
  {
    res.status(401).json({error: "unauthorized", code: 401});
  }


  const body = JSON.parse(req.body);
  if (!body.referrer_address || !body.campaign_id) {
    res.status(400).send("Missing referrer address or campaign id in body")
  } else {

    const link = generateReferralLink(body.referrer_address, body.campaign_id);
    res.status(200).send(link);
  }
}