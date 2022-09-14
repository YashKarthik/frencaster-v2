import type { NextPage } from 'next'
import Head from 'next/head'
import UsernameInput from "../components/UsernameInput";

const Home: NextPage = () => {
  return (
    <div className='w-screen h-screen'>
      <Head>
        <title>Frencircle</title>
        <meta name="description" content="Visualize your Farcaster interaction circle!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="pt-10 pb-20 text-center text-4xl font-bold hover:text-violet-600">
        <h1>Frencircle</h1>
      </div>

      <div className="pt-10">
        <UsernameInput />
      </div>
    </div>
  )
}

export default Home
