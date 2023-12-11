import { NextApiRequest, NextApiResponse } from "next";

import { ethers, Signer } from "ethers";
import { SecretsManager } from "@chainlink/functions-toolkit";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (
    !req.headers["api_key"] ||
    req.headers["api_key"] !== "8Tbinn8rPEMu1xKpyuukaAGLqOfmRWaL"
  ) {
    res.status(401).json({ error: "unauthorized", code: 401 });
  }

  const network = {
    avalanche: {
      router: "0xA9d587a00A31A52Ed70D6026794a8FC5E2F5dCb0",
      rpc: "https://rpc.ankr.com/avalanche_fuji",
      donId: "fun-avalanche-fuji-1",
    },
    sepolia: {
      router: "0xb83E47C2bC239B3bf370bc41e1459A34b41238D0",
      rpc: "https://ethereum-sepolia.publicnode.com",
      donId: "fun-ethereum-sepolia-1",
    },
    mumbai: {
      router: "0x6E2dc0F9DB014aE19888F539E59285D2Ea04244C",
      rpc: "https://rpc.ankr.com/polygon_mumbai",
      donId: "fun-polygon-mumbai-1",
    },
  };

  const chain = "avalanche";

  const privateKey = process.env.WALLET_PK || "";
  const provider = new ethers.providers.JsonRpcProvider(network[chain].rpc);
  const wallet = new ethers.Wallet(privateKey as string);
  const signer = wallet.connect(provider) as Signer;

  // MUMBAI ROUTER ADDRESS
  const functionsRouterAddress = network[chain].router;
  const donId = network[chain].donId;

  const gatewayUrls = [
    "https://01.functions-gateway.testnet.chain.link/",
    "https://02.functions-gateway.testnet.chain.link/",
  ];

  const slotId = 0;
  const minutesUntilExpiration = 10;
  const secretsManager = new SecretsManager({
    signer,
    functionsRouterAddress,
    donId,
  });
  await secretsManager.initialize();

  const secrets = {
    zkScopeApiKey: process.env.ZK_SCOPE_KEY || "",
    hyperclusterKey: process.env.HYPERCLUSTER_KEY || "",
  };
  console.log(secrets);

  console.log("Encrypting secrets and uploading to DON...");
  const encryptedSecretsObj = await secretsManager.encryptSecrets(secrets);

  const { version, success } = await secretsManager.uploadEncryptedSecretsToDON(
    {
      encryptedSecretsHexstring: encryptedSecretsObj.encryptedSecrets,
      gatewayUrls,
      slotId,
      minutesUntilExpiration,
    }
  );

  console.log(version);

  const encryptedSecretsReference =
    secretsManager.buildDONHostedEncryptedSecretsReference({
      slotId,
      version,
    });
  console.log(
    `\nYou can now use slotId ${slotId} and version ${version} and reference ${encryptedSecretsReference} to reference the encrypted secrets hosted on the DON.`
  );
  res.status(200).json({
    slotId,
    version,
  });
}
