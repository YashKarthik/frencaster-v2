import '../styles/globals.css'
import type { AppProps } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
    <Component {...pageProps} />
    <div className="absolute inset-x-0 bottom-4 flex sm:flex-row flex-col justify-evenly text-violet-700 underline text-center">
      <a target="_blank" href="https://twitter.com/_yashkarthik">@_yashkarthik (TW)</a>
      <a href="farcaster://profiles/0x6eFe7a747E8d47E5fA2161Ff2591420830D618de">@yashkarthik (FC)</a>
      <a target="_blank" href="https://github.com/yashkarthik/frencircle-v2">Source</a>
      <a target="_blank" href="https://yashkarthik.xyz/archive/friend-caster">How it Works</a>
      <a href="/faq">FAQ</a>
    </div>
    </>
  );
}

export default MyApp
