# Frencircle

Create your own [Farcaster](https://farcaster.xyz) interaction circle. *Inspired by [Chirpty](https://chirpty.com/)*. Friendcaster generates an image that shows you the users you interact with most on Farcaster.

- Repo contains the v2 of [Friendcaster](https://github.com/yashkarthik/friendcaster)


#### What counts as interaction?
- Currently only replies are considered.
- Other interactions (recasts, likes, watchings) will be considered when Farcaster hubs are
implementad and recasts etc become protocol level features.

# v2
- [ ] Mint as nft
    - [ ] Write nft contracts.
    - [ ] Generate image from user's page.
    - [ ] Store image on IPFS/Arweave.
    - [ ] Mint as NFT.
- [ ] Fix responsiveness [help needed].
- [x] Build a full-fledged frontend Next.js. And offload image rendering here.
- [x] Use an outward spiral instead of multiple levels of circles. (alignment)
- [x] Replace a static image gen via canvas with a dynamic animated thingy built via react
- [x] Serverless using /api routes.
- [x] Show user metadata
  - [x] Username
  - [x] Bio
  - [x] Top cast (need to add link)
  - [x] Followers
  - [x] Open profile in fc
- [x] Allow users to customize stuff: bg, profile outline, size, num of spiral layers etc.

- [ ] Consider other interactions in the calculation. Possible when v2 of farcaster launches, as currently likes, recast, etc are not protocol level features.
