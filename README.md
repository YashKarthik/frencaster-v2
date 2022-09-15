# Frencircle

Create your own [Farcaster](https://farcaster.xyz) interaction circle. *Inspired by [Chirpty](https://chirpty.com/)*. Friendcaster generates an image that shows you the users you interact with most on Farcaster.

- Repo contains the v2 of [Friendcaster](https://github.com/yashkarthik/friendcaster)


#### What counts as interaction?
- Currently only replies are considered.
- I'm actively working to include other stuff (likes, recasts etc)

# v2
- [x] Build a full-fledged frontend Next.js. And offload image rendering here.
- [x] Use an outward spiral instead of multiple levels of circles.
- [x] Replace a static image gen via canvas with a dynamic animated thingy built via react
- [x] Serverless using /api routes.
- [ ] Allow users to customize stuff: bg, profile outline, size, num of spiral layers etc.
- [ ] Integrate with farcasternews.xyz and others to show karma.
- [ ] Hovering a profile should show who it is etc.
- [ ] Mint as nft (on some layer2, probs optimism). Store image on Arweave/IPFS.

- [ ] Consider other interactions in the calculation. Possible when v2 of farcaster launches, as currently likes, recast, etc are not protocol level features.

## Resources
- https://github.com/lfglabs/farcaster-indexer#farcaster-indexer for farcasternews karma.
