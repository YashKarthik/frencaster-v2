import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'

const FaqElement = ({heading, text}) => (
  <div className='p-4 ml-20'>
    <h4 className="text-xl font-medium">{heading}</h4>
    <p className='text-gray-600'>{text}</p>
  </div>
);

const Faq: NextPage = () => {
  return (
    <div className='w-screen h-screen'>
      <Head>
        <title>Frencircle</title>
        <meta name="description" content="FAQ about Frencircle" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Link href="/">
        <a className="text-violet-700 pl-6">Home</a>
      </Link>

      <main>

        <div >
          <h1 className="pt-10 pb-20 text-center text-4xl font-bold hover:text-violet-600">
            Frequently Asked Questions
          </h1>

          <div >
            <FaqElement heading='What is Frencircle?' text="
            Friendcaster generates an image that displays the users you interact with the most on Farcaster
            "
            />

            <FaqElement heading='What is Farcaster?' text="
            Farcaster is a sufficiently decentralized protocol that empowers developers to build novel social networks. Learn more on farcaster.xyz
            "
            />

            <FaqElement heading='Where does the data come from?' text="
            Friendcaster uses publically available data on the Farcaster smart contract (name registry) and every user's host directory.
            "
            />

            <FaqElement heading='What counts as an interaction?' text="
            Currently only casts replies are considered as interactions, I'm actively working to include likes, recasts, and watching in the calculations.
            "
            />

            <FaqElement heading='Do I need to login to my Farcaster account to use Friendcaster?' text="
            No, you do NOT need to login to your Farcaster account or give any permissions to use Friendcaster. Friendcascter only uses publicly available data.
            "
            />
          </div>

        </div>
      </main>
    </div>
  );
}

export default Faq;
