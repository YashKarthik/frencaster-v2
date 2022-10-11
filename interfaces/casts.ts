/**
* @file Exports interfaces to work with casts.*/

export interface IData {
  text: string;
  replyParentMerkleRoot: string;
}

export interface IBody {
  type: string;
  publishedAt: any;
  sequence: number;
  address: string;
  username: string;
  data: IData;
  prevMerkleRoot: string;
}

export interface IOpenGraph {
  url: string;
  title: string;
  description: string;
  domain: string;
  image: string;
  imageId?: number;
  logo: string;
  useLargeImage: boolean;
  strippedCastText: string;
}

export interface IAttachments {
  openGraph: IOpenGraph[];
}

export interface IMention {
  address: string;
  username: string;
}

export interface IReactions {
  count: number;
  type: string;
  self: boolean;
}

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

export interface IRecaster {
  address: string;
  username: string;
  displayName: string;
  avatar: IAvatar;
  followerCount: number;
  followinICount: number;
  isViewerFollowing: boolean;
  isFollowingViewer: boolean;
  profile: IProfile;
  avatarUrl: string;
  isVerifiedAvatar: boolean;
}

export interface IRecasts {
  count: number;
  self: boolean;
}

export interface IWatches {
  count: number;
  self: boolean;
}

export interface IReplyParentUsername {
  address: string;
  username: string;
}

export interface IMeta {
  displayName: string;
  avatar: string;
  isVerifiedAvatar: boolean;
  mentions: IMention[];
  numReplyChildren: number;
  reactions: IReactions;
  recasters: IRecaster[];
  recasts: IRecasts;
  watches: IWatches;
  replyParentUsername: IReplyParentUsername;
  recast?: boolean;
}

export interface ICast {
  body: IBody;
  attachments: IAttachments;
  signature: string;
  merkleRoot: string;
  threadMerkleRoot: string;
  meta: IMeta;
}
