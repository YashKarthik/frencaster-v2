# Frencaster

Create your own [Farcaster](https://farcaster.xyz) interaction circle. *Inspired by [Chirpty](https://chirpty.com/)*. Friendcaster generates an image that shows you the users you interact with most on Farcaster.

- Repo contains the v2 of [Friendcaster](https://github.com/yashkarthik/friendcaster)


#### What counts as interaction?
- Currently only replies are considered.
- I'm actively working to include other stuff (likes, recasts etc)

# v2
- [ ] Consider other interactions in the calculation.
- [ ] Build a full-fledged frontend Next.js. And offload image rendering here.
- [ ] Use an outward spiral instead of multiple levels of circles.
- [ ] Replace a static image gen via canvas with a dynamic animated thingy built via react
- [ ] Allow users to customize stuff: bg, profile outline, size, num of spiral layers etc.
- [ ] Hovering a profile should show who it is etc.
- [ ] Integrate with farcasternews.xyz to show karma.
- [ ] Mint as nft (on some layer2, probs optimism). Store image on Arweave/IPFS.
- [ ] Serverless using /api
