import { CipherKey, createCipheriv, createDecipheriv } from "node:crypto"
import dotenv from "dotenv";

dotenv.configDotenv()

const ek = Buffer.from(process.env.ENCRYPTION_KEY as string, 'hex');
const iv = Buffer.from(process.env.INVARIANT as string, 'hex');



export interface DecryptedRefferalCodeResponse {
  referrer: string;
  campaign_id: string;
  referring: string;
}


// generates a referal link that can only be used by a specific address
export function generateReferralLink(referrer_address: string, campaign_id: string, referee_address: string | null = "0"): string {

  const cipher = createCipheriv('aes-256-cbc', ek, iv);

  const plaintext =  referrer_address + "/" + campaign_id + "/" + referee_address;

  // Update the cipher with the plaintext
  let encryptedBuffer = cipher.update(plaintext, 'utf-8', 'hex');

  // // Finalize the encryption
  encryptedBuffer += cipher.final('hex');

  return encryptedBuffer;

}


// generateReferralLink("addr", "add");
// generateReferralLink("addr", "add", "addr");


export function resolveReferralLink(encrypted: string): DecryptedRefferalCodeResponse {
  // Create a decipher using AES-CBC with the same key and IV

  const decipher = createDecipheriv('aes-256-cbc', ek, iv);
  
  // // Update the decipher with the encrypted data
  let decryptedBuffer;

  decryptedBuffer = decipher.update(encrypted, 'hex', 'utf-8');
  decryptedBuffer += decipher.final('utf-8');

  const data = decryptedBuffer.split("/");

  if (data.length !== 3) {
    throw Error("Could not decode referral link");
  }

  return {
    referrer: data[0],
    campaign_id: data[1],
    referring: data[2]
  }

}