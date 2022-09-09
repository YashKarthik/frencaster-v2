import { utils, Contract } from 'ethers';
import got from "got";

export interface IDirectory {
  directoryUrl: string;
  directoryBody: {
    version: number;
    proofUrl: string;
    avatarUrl: string;
    timestamp: number;
    displayName: string;
    addressActivityUrl: string;
  }
}

/* Returns user's directory url, and data from it.
 * @return  {IDirectory}
 */

export const getDirectory = async (username: string, registryContract: Contract): Promise<IDirectory>  => {

  const byte32Name = utils.formatBytes32String(username);
  const directoryUrl: string = await registryContract.getDirectoryUrl(byte32Name);

  const directoryResponse = await got(directoryUrl);
  const directoryBody: IDirectory['directoryBody'] = JSON.parse(directoryResponse.body).body;

  return {
    directoryUrl,
    directoryBody
  };
}

interface IAvatarUrlObj {
  [key: string]: string
}

/* Takes a list of users and returns a username:avatar_url pair object
 * @return {IAvatarUrlObj}  an object(k,v) where k=username, v=avatar url
 */

export const getAvatarListUrl  = async (usernames: string[], registryContract:any): Promise<IAvatarUrlObj> => {
  const avatarUrlObj: IAvatarUrlObj = {};

  await Promise.all(usernames.map(async username => {
    const { directoryBody } = await getDirectory(username, registryContract);
    avatarUrlObj[username] = directoryBody.avatarUrl;
  }))

  return avatarUrlObj;
}
