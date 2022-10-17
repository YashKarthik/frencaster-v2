import got from "got";
import { utils, Contract } from 'ethers';

import { IUser, IOverview } from "../interfaces/profile";
import { ICast } from "../interfaces/casts";
import { fnameToAddress } from "./utils"

/**
* @return Returns a list of users: IUser that fname has replied to.
* */
export const getRepliedPeople = async (fname: string, nameProxy: Contract): Promise<(IOverview | undefined)[]> => {
  const address = await fnameToAddress(fname, nameProxy);
  const res: {"result": {"casts": ICast[]}} = await got(`https://api.farcaster.xyz/v1/profiles/${address}/casts`).json();
  const casts = res.result.casts;

  const users: (IOverview | undefined)[] = await Promise.all(casts.map(async cast => {
    if (cast.body.data.replyParentMerkleRoot) {
      const address = cast.meta.replyParentUsername.address;
      const profileRes: {"result": {"user": IUser}} = await got(`https://api.farcaster.xyz/v1/profiles/${address}`).json();
      const castsRes: {"result": {"casts": ICast[]}} = await got(`https://api.farcaster.xyz/v1/profiles/${address}/casts`).json();
      const profile = profileRes.result.user;
      const latestCast = castsRes.result.casts[0];

      return {
        user:profile,
        latestCast: latestCast
      };
    }
  }))

  return users;
}
