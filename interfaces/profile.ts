/**
 * @file  Exports a bunch of interfaces that compose a user's profile.
 */

import { ICast } from "./casts";

export interface IAvatar {
  url: string;
  isVerified: boolean;
}

export interface IBio {
  text: string;
  mentions: any[];
}

export interface IDirectMessageTargets {
  telegram: string;
}

export interface IProfile {
  bio: IBio;
  directMessageTargets: IDirectMessageTargets;
}

export interface IUser {
  address: string;
  username: string;
  displayName: string;
  avatar: IAvatar;
  followerCount: number;
  followingCount: number;
  isViewerFollowing: boolean;
  isFollowingViewer: boolean;
  profile: IProfile;
  viewerCanSendDirectCasts: boolean;
}

export interface IOverview {
  user: IUser;
  latestCast: ICast;
}

export interface IUserComponent {
  data: IOverview;
  count: number;
}
