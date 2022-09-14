import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Link from 'next/link'
import { INameFreq } from './api/[username]';

const Frens: NextPage = () => {
  const router = useRouter()
  const { body } = router.query
  const data: INameFreq[] = JSON.parse(body as string);
  console.log(data);

  return (
    <div className='w-screen h-screen'>
      <Head>
        <title>Frencircle</title>
        <meta name="description" content="Visualize your Farcaster interaction circle!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Link href="/">
        <a className="text-violet-700 pl-6">Home</a>
      </Link>

      <div className="pt-5 pb-20 text-center text-4xl font-bold hover:text-violet-600">
        <h1>{data[0].username}'s frencircle</h1>
      </div>
    </div>
  );
}


export default Frens;
