# Frencircle

Create your own [Farcaster](https://farcaster.xyz) interaction circle. *Inspired by [Chirpty](https://chirpty.com/)*. Friendcaster generates an image that shows you the users you interact with most on Farcaster.

- Repo contains the v2 of [Friendcaster](https://github.com/yashkarthik/friendcaster)


#### What counts as interaction?
- Currently only replies are considered.
- I'm actively working to include other stuff (likes, recasts etc)

# v2
- [x] Build a full-fledged frontend Next.js. And offload image rendering here.
- [x] Use an outward spiral instead of multiple levels of circles. (alignment)
- [x] Replace a static image gen via canvas with a dynamic animated thingy built via react
- [x] Serverless using /api routes.
- [-] Show user metadata
  - [x] Username
  - [x] Bio
  - [-] Top cast (need to add link)
  - [x] Followers
  - [x] Open profile in fc
- [ ] Allow users to customize stuff: bg, profile outline, size, num of spiral layers etc.
  - Need to convert the vars into state
  -  And move state up the tree. `useContext()`.
- [ ] Mint as nft (on some layer2, probs optimism). Store image on Arweave/IPFS.

- [ ] Consider other interactions in the calculation. Possible when v2 of farcaster launches, as currently likes, recast, etc are not protocol level features.

## Resources
- https://www.youtube.com/watch?v=8ARpZ0zL48g - contracts on zksync.
