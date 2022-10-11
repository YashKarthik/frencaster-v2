/*
 * @file    Exposes api which returns a list of users the the caller has interacted with.
 * @todo    Implement api caching
 */

import { providers, Contract } from 'ethers';
import { NextApiRequest, NextApiResponse } from 'next'
//import { getDirectory, getAvatarListUrl  } from '../../utils/directory';
//import { getRepliedUsernames } from '../../utils/interactions';

import { getRepliedPeople } from "../../utils/metadata";

import ID_REGISTRY_ABI from "../../abis/id_registry_abi";
import NAME_REGISTRY_PROXY_ABI from "../../abis/name_registry_proxy_abi";

const ID_REGISTRY_ADDRESS = "0xda107a1caf36d198b12c16c7b6a1d1c795978c42";
const NAME_REGISTRY_PROXY_ADDRESS = "0xe3be01d99baa8db9905b33a3ca391238234b79d1";

// const REGISTRY_CONTRACT_ADDRESS = '0xe3Be01D99bAa8dB9905b33a3cA391238234B79D1';
// const REGISTRY_ABI = [
//   {
//     name: 'getDirectoryUrl',
//     inputs: [{ internalType: 'bytes32', name: 'username', type: 'bytes32' }],
//     outputs: [{ internalType: 'string', name: '', type: 'string' }],
//     stateMutability: "view",
//     type: 'function',
//   },
//   {
//     name: 'addressToUsername',
//     inputs: [{ internalType: 'address', name: '', type: 'address' }],
//     outputs: [{ internalType: 'bytes32', name: '', type: 'bytes32' }],
//     stateMutability: "view",
//     type: 'function',
//   },
// ]

interface IFreqObj {
  string: number;
}

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

const getInteractionFrequency = async (username: string, nameProxy:any): Promise<any>  => {
  const people = await getRepliedPeople(username, nameProxy);

  const arr = [5, 5, 5, 2, 2, 2, 2, 2, 9, 4];
  const counts: any = {};
  const users: any = {}

  for (const user of people) {
    if (user) {
      counts[user!.username] = counts[user!.username] ? counts[user.username] + 1 : 1;
      users[user!.username] = user;
    }
  }

  const tally: any[] = []
  for (const [uname, count] of Object.entries(counts)) {
	tally.push({
      data: users[uname],
      count: count
	});
  }

  tally.sort((a:any, b:any) => b.count - a.count);
  let head: INameFreq[] = tally.slice(0, 49);

  console.log(head);
  //// the caller's username to the top of the list (for center)
  //head = [{username: username, freq: 0, avatarUrl: userUrl}, ...head];

  return head;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { username } = req.query;

  const provider = new providers.AlchemyProvider('goerli', process.env.ALCHEMY_API_KEY);
  const nameProxy = new Contract(NAME_REGISTRY_PROXY_ADDRESS, NAME_REGISTRY_PROXY_ABI, provider);
  const idContract = new Contract(ID_REGISTRY_ADDRESS, ID_REGISTRY_ABI, provider);
  console.log('starting');

  try {
    //const result = await getInteractionFrequency(username as string, registryContract);
    //const data = JSON.stringify(result);
    getInteractionFrequency('yashkarthik', nameProxy);

    res.status(200).json({"testing":"testing"});
  } catch (err) {
    res.status(500).json({ error: err })
  }
}
