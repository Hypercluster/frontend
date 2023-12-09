import { Address } from "viem";

export interface IcreateCampaignParams {
  rewardTokenAddress: Address
  rootReferral: Address,
  rewardPercentPerMilestone: number,
  totalSupply: number,
  startIn: number,
  endIn: number,
  metadata: string
}