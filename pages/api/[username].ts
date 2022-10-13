/*
 * @file    Exposes api which returns a list of users the the caller has interacted with.
 * @todo    Implement api caching
 */

import { providers, Contract } from 'ethers';
import { NextApiRequest, NextApiResponse } from 'next'

import { getRepliedPeople } from "../../utils/metadata";
import { IOverview, IUserComponent } from '../../interfaces/profile';

import ID_REGISTRY_ABI from "../../abis/id_registry_abi";
import NAME_REGISTRY_PROXY_ABI from "../../abis/name_registry_proxy_abi";

const ID_REGISTRY_ADDRESS = "0xda107a1caf36d198b12c16c7b6a1d1c795978c42";
const NAME_REGISTRY_PROXY_ADDRESS = "0xe3be01d99baa8db9905b33a3ca391238234b79d1";

export interface INameFreq {
  username: string;
  freq: number;
  avatarUrl?: string;
}

/*
 * If a user already exists in the object, increment the count.
 * Otherwise create a new index for the user and set the count to 1
 * @returns {object { string: number }}    an object of users whose post the user has replied to.
 * @todo    currently only supports replie, later will figure out recasts and likes.
 * @todo    put this function into utils/interaction_weights.ts when other interactions come up.
 * @todo    refactor
 */

const getInteractionFrequency = async (username: string, nameProxy:any): Promise<IUserComponent[]>  => {
  const people = await getRepliedPeople(username, nameProxy);

  let users: {[key:string]: (IOverview | undefined)} = {};
  let counts: {[key:string]: number} = {};

  for (const user of people) {
    if (user) {
      counts[user!.user.username] = counts[user!.user.username] ? counts[user.user.username] + 1 : 1;
      users[user!.user.username] = user;
    }
  }

  const tally: IUserComponent[] = []
  for (const [uname, count] of Object.entries(counts)) {
	tally.push({
      data: users[uname]!,
      count: count
	});
  }

  tally.sort((a:any, b:any) => b.count - a.count);
  let head = tally.slice(0, 49);

  console.log('From api route', head);
  //// the caller's username to the top of the list (for center)
  //head = [{username: username, freq: 0, avatarUrl: userUrl}, ...head];

  return head;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { username } = req.query;

  const provider = new providers.AlchemyProvider('goerli', process.env.ALCHEMY_API_KEY);
  const nameProxy = new Contract(NAME_REGISTRY_PROXY_ADDRESS, NAME_REGISTRY_PROXY_ABI, provider);
  const idContract = new Contract(ID_REGISTRY_ADDRESS, ID_REGISTRY_ABI, provider);
  console.log('----------API REQUESTED----------');

  try {
    const result = await getInteractionFrequency(username as string, nameProxy);
    res.status(200).json({'result': result});
  } catch (err) {
    res.status(500).json({ error: err })
  }
}
