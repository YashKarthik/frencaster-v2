/*
 * @file    Exposes api which returns a list of users the the caller has interacted with.
 * @todo    Implement api caching
 */

import { providers, Contract } from 'ethers';
import { NextApiRequest, NextApiResponse } from 'next'
import { getDirectory, getAvatarListUrl  } from '../../utils/directory';
import { getRepliedUsernames } from '../../utils/interactions';


const REGISTRY_CONTRACT_ADDRESS = '0xe3Be01D99bAa8dB9905b33a3cA391238234B79D1';
const REGISTRY_ABI = [
  {
    name: 'getDirectoryUrl',
    inputs: [{ internalType: 'bytes32', name: 'username', type: 'bytes32' }],
    outputs: [{ internalType: 'string', name: '', type: 'string' }],
    stateMutability: "view",
    type: 'function',
  },
  {
    name: 'addressToUsername',
    inputs: [{ internalType: 'address', name: '', type: 'address' }],
    outputs: [{ internalType: 'bytes32', name: '', type: 'bytes32' }],
    stateMutability: "view",
    type: 'function',
  },
]

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

const getInteractionFrequency = async (username: string, registryContract:any): Promise<INameFreq[]>  => {
  const { directoryBody } = await getDirectory(username, registryContract);
  const repliedPeople = await getRepliedUsernames(username, directoryBody);

  const interactionFrequency: IFreqObj = repliedPeople.reduce((prevValue: any, currentValue: string) => {
    return prevValue[currentValue] ? ++prevValue[currentValue] : prevValue[currentValue] = 1, prevValue
  }, {});

  // @todo implement similar ^ thing for other interactions

  const tally: INameFreq[] | any[] = []
  for (const [uname, freq] of Object.entries(interactionFrequency)) {
	tally.push({
      username: uname,
      freq: freq
	});
  }

  tally.sort((a:any, b:any) => b.freq - a.freq);
  let head: INameFreq[] = tally.slice(0, 49);

  // we need only the user name for the ring.
  const usernames = head.map(u => u.username);

  const userUrl = directoryBody.avatarUrl;
  const avatarUrlList = await getAvatarListUrl(usernames, registryContract);
  for (const i of head) {
    i.avatarUrl = avatarUrlList[i.username];
  }

  // the caller's username to the top of the list (for center)
  head = [{username: username, freq: 0, avatarUrl: userUrl}, ...head];

  return head;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { username } = req.query;

  const provider = new providers.AlchemyProvider('rinkeby', process.env.ALCHEMY_API_KEY);
  const registryContract = new Contract(REGISTRY_CONTRACT_ADDRESS, REGISTRY_ABI, provider);

  try {
    const result = await getInteractionFrequency(username as string, registryContract);
    const data = JSON.stringify(result);

    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: 'failed to load data' })
  }
}
