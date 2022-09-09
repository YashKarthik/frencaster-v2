/*
 * @file Functions to returns lists of users whom the user has interacted with.
 */

import got from "got";
import { IDirectory } from './directory';

interface IAction {

  body: Object;
  merkleRoot: string;
  signature: string;
  meta: {
    displayName: string;
    avatar: string;
    isVerifiedAvatar: boolean;
    numReplyChildren: number;
    reactions: Object;
    recasts: Object;
    watches: Object;
    replyParentUsername: {
      address: string;
      username: string;
    }
  }

}

/*
 * Traverses over the user's timeline and return the usernames whom the user has replied to.
 * If a cast is a reply, it will have the `replyParentUsername` property.
 * @return {string[]}    an array of users whose post the user has replied to.
 */
export const getRepliedUsernames = async (
  username: string,
  directoryBody: IDirectory['directoryBody']
): Promise<string[]>  => {

  const addressActivityResponse = await got(directoryBody.addressActivityUrl);
  const addressActivity: IAction[] = JSON.parse(addressActivityResponse.body);

  const repliedPeople: string[] = addressActivity.filter((action:IAction) => {
    // check if the action is a associated with another user.
    if (!action.meta.replyParentUsername) {
      return false;
    } else if (action.meta.replyParentUsername.username == username) {
      // this one returns false if the user is replying to themself.
      return false;
    }

    return true;
  }).map((action:any) => action.meta.replyParentUsername.username)

  return repliedPeople;
}
