/**
* @file Exports utility function to convert between tokenIds, fnames and addresses
* */

import { utils, Contract, BigNumber } from 'ethers';
import got from "got";

import { IUser } from "../interfaces/profile";


export const tokenIdToFname = (tokenId: string): string =>  utils.parseBytes32String(utils.hexlify(BigNumber.from(tokenId)));
export const fnameToTokenId = (fname: string): string => BigNumber.from(utils.hexlify(utils.formatBytes32String(fname))).toString();
export const fnameToAddress = async (fname: string, nameProxy: Contract): Promise<string> => await nameProxy.ownerOf(fnameToTokenId(fname));

export const fnameFromAddress = async (address: string): Promise<string> => {
  const user: IUser = await got(`https://api.farcaster.xyz/v1/profiles/${address}/`).json();
  return user.username as string;
}
