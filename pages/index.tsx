import type { NextPage } from 'next'
import Head from 'next/head'
import UsernameInput from "../components/UsernameInput";

import { Heading, Box } from '@chakra-ui/react'

const Home: NextPage = () => {
  return (
    <Box h='90vh'>
      <Head>
        <title>Frencircle</title>
        <meta name="description" content="Visualize your Farcaster interaction circle!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Heading
        textAlign='center'
        pt='20'
        pb='10'
        _hover={{textColor:'purple.500'}}
      >
        Frencircle
      </Heading>

      <UsernameInput />
    </Box>
  )
}

export default Home
