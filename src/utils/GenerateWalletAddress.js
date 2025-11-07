import { randomBytes } from "crypto"

export const GenerateWalletAddress = () => {
    const randomString = randomBytes(20);
    const address = "0x" + randomString.toString('hex');
    return address;
}