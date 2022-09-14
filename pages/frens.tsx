import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Link from 'next/link'
import { INameFreq } from './api/[username]';

import { Box, Link as ChakraLink, Heading } from '@chakra-ui/react';

const Frens: NextPage = () => {
  const router = useRouter()
  const { body } = router.query
  const data: INameFreq[] = JSON.parse(body as string);
  console.log(data);

  return (
    <Box h='90vh'>
      <Head>
        <title>Frencircle</title>
        <meta name="description" content="Visualize your Farcaster interaction circle!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Link href="/">
        <ChakraLink pl='6' textColor='purple.600'>Home</ChakraLink>
      </Link>

      <Heading
        pt='5' pb='20'
        textAlign='center'
        fontSize='4xl'
        fontWeight='bold'
        _hover={{textColor: "purple.600"}}
      >
        {data[0].username}'s frencircle
      </Heading>
    </Box>
  );
}


export default Frens;
