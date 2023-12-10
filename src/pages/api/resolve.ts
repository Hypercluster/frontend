import { resolveReferralLink } from "@/helpers/referrals";
import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {

  let referrer, campaign_id, referring;


  if (!req.headers['api_key'] || req.headers['api_key'] !== "8Tbinn8rPEMu1xKpyuukaAGLqOfmRWaL")
  {
    res.status(401).json({error: "unauthorized", code: 401});
  }

  try {
    res.status(200).json(resolveReferralLink(req.query.ref as string));

  } catch (error) {
    return res.status(500).json({error: "invalid referral link", code: 401});
  }


}

// const apiKey = req.get('API-Key')
// if (!apiKey || apiKey !== process.env.API_KEY) {
//   res.status(401).json({error: 'unauthorised'})
// } else {