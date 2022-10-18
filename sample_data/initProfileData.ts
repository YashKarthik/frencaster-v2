import { IUserComponent } from "../interfaces/profile";

export const testData: IUserComponent[] = [
  {
    "data": {
      "user": {
        "address": "0x74232BF61e994655592747E20bDF6fa9B9476f79",
        "username": "dwr",
        "displayName": "Dan Romero",
        "avatar": {
          "url": "https://res.cloudinary.com/merkle-manufactory/image/fetch/c_fill,f_png,w_256/https://lh3.googleusercontent.com/MyUBL0xHzMeBu7DXQAqv0bM9y6s4i4qjnhcXz5fxZKS3gwWgtamxxmxzCJX7m2cuYeGalyseCA2Y6OBKDMR06TWg2uwknnhdkDA1AA",
          "isVerified": true
        },
        "followerCount": 3324,
        "followingCount": 3487,
        "isViewerFollowing": false,
        "isFollowingViewer": false,
        "profile": {
          "bio": {
            "text": "Working on Farcaster nf.td/dwr",
            "mentions": []
          },
          "directMessageTargets": {
            "telegram": "https://t.me/dwromero"
          }
        },
        "viewerCanSendDirectCasts": false
      },
      "latestCast": {
        "body": {
          "type": "text-short",
          "publishedAt": 1665727507239,
          "sequence": 15514,
          "address": "0x74232BF61e994655592747E20bDF6fa9B9476f79",
          "username": "dwr",
          "data": {
            "text": "Soon!\n\nhttps://github.com/farcasterxyz/protocol#33-recovery",
            "replyParentMerkleRoot": "0x95eb0e658eea0bc308fc788b1ca61898f1d40ad209eab9b5a38fbf621156df34"
          },
          "prevMerkleRoot": "0x90a4813f0b31e0fa271589f18122ed603642e62b8aeeefd5476436c2070a66e4"
        },
        "attachments": {
          "openGraph": [
            {
              "url": "https://github.com/farcasterxyz/protocol#33-recovery",
              "title": "GitHub - farcasterxyz/protocol: Specification of the Farcaster Protocol",
              "description": "Specification of the Farcaster Protocol. Contribute to farcasterxyz/protocol development by creating an account on GitHub.",
              "domain": "github.com",
              "image": "https://opengraph.githubassets.com/1f24286ab0355cf3da5905ec72eb7c31734ebd17846916422f329953aa1959e6/farcasterxyz/protocol",
              "imageId": 326179,
              "logo": "https://github.com/fluidicon.png",
              "useLargeImage": true,
              "strippedCastText": "Soon!\n\n"
            }
          ]
        },
        "signature": "0x1af83c04c269246fff7bc755639dabd7759ffdc6c9828229970b09877d92e25f3cfa4dd02b0ac44d10a27da9bf9c2c677699ba1ae0463828dd2f8511c84f75cb1c",
        "merkleRoot": "0x38ab3cc4610dd08111bc65b603ab5d76731ec8f459001f8cb6f479a1fc69cc8f",
        "threadMerkleRoot": "0x1cd7dcb3100ded388277f35a55605b8fa74cc41a278bb1161ebfed8bd77f3c07",
        "meta": {
          "displayName": "Dan Romero",
          "avatar": "https://res.cloudinary.com/merkle-manufactory/image/fetch/c_fill,f_png,w_256/https://lh3.googleusercontent.com/MyUBL0xHzMeBu7DXQAqv0bM9y6s4i4qjnhcXz5fxZKS3gwWgtamxxmxzCJX7m2cuYeGalyseCA2Y6OBKDMR06TWg2uwknnhdkDA1AA",
          "isVerifiedAvatar": true,
          "mentions": [],
          "numReplyChildren": 0,
          "replyParentUsername": {
            "address": "0x4535E82E51FaB630a03ed6e3632318bBec16afAA",
            "username": "salvino"
          },
          "reactions": {
            "count": 3,
            "type": "Like",
            "self": false
          },
          "recasters": [],
          "recasts": {
            "count": 0,
            "self": false
          },
          "watches": {
            "count": 0,
            "self": false
          }
        }
      }
    },
    "count": 3
  },
]
