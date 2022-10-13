import got from "got";
import { utils, Contract } from 'ethers';

import { createClient } from "@supabase/supabase-js";
import { count, profileEnd } from "console";


import { IUser, IOverview } from "../interfaces/profile";
import { ICast } from "../interfaces/casts";
import { fnameToAddress } from "./utils"

const supabase = createClient(
  "https://kpwbglpxjuhiqtgtvenz.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imtwd2JnbHB4anVoaXF0Z3R2ZW56Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NTgzNzg2MjEsImV4cCI6MTk3Mzk1NDYyMX0.zecokpSRK0MI_nOaSAgFZJCMkPSpEXraPKqQD5fogE4"
);

interface IProfile {
  bio:          string;
  address:      string;
  numFollowers: number;
}

export const fetchProfile = async (username:string): Promise<IProfile> => {
  const { data, error } = await supabase
    .from('account_view')
    .select('bio, address, num_followers')
    .match({username: username});

  if (error) {
    throw error;
  }

  //console.log(data)

  return {
    bio           :data![0].bio!,
    address       :data![0].address!,
    numFollowers  :data![0].num_followers!,
  };
}

//interface ICast {
//  text:       string;
//  merkleRoot: string;
//}

export const fetchTopCast = async (username:string): Promise<any> => {
  const { data, error } = await supabase
    .from('account_view')
    .select('activity_view (text, merkle_root)')
    .order('reactions_count', { foreignTable: 'activity_view', ascending: false })
    .limit(1,  {foreignTable: 'activity_view'})
    .match({username: username})

  if (error) {
    throw error;
  }
  return {
    text: data[0].activity_view[0].text,
    merkleRoot: data[0].activity_view[0].merkleRoot,
  }
}

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
