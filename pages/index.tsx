import Head from 'next/head'
import NextLink from 'next/link';
import type { NextPage } from 'next'
import UsernameInput from "../components/UsernameInput";

import {
  HStack,
  Heading,
  Box,
  Text,
  Link as ChakraLink,
} from '@chakra-ui/react'

const Home: NextPage = () => {
  return (
    <Box h='100vh' display='flex' flexDir='column' justifyContent='space-between'>
      <Head>
        <title>Frencircle</title>
        <meta name="description" content="Visualize your Farcaster interaction circle!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Box>
        <Heading
          textAlign='center'
          pt='20'
          pb='5'
          _hover={{textColor:'purple.500'}}
        >
          Frencircle
        </Heading>

        <Text
          textAlign='center'
          textColor='gray.500'
          pb='10'
        >
          Generate and mint your Farcaster interaction circle!
        </Text>

        <UsernameInput />
      </Box>

      <HStack flexDir='row' justifyContent='space-evenly' textAlign='center' m='3'>
        <ChakraLink color='purple.600' isExternal href="https://twitter.com/_yashkarthik">@_yashkarthik (TW)</ChakraLink>
        <ChakraLink color='purple.600' href="farcaster://profiles/0x6eFe7a747E8d47E5fA2161Ff2591420830D618de">@yashkarthik (FC)</ChakraLink>
        <ChakraLink color='purple.600' isExternal href="https://github.com/yashkarthik/frencircle-v2">Source </ChakraLink>
        <ChakraLink color='purple.600' isExternal href="https://yashkarthik.xyz/archive/friend-caster">How it Works </ChakraLink>
        <NextLink href='/faq' passHref>
          <ChakraLink  color='purple.600'>FAQ </ChakraLink>
        </NextLink>
      </HStack>
    </Box>
  )
}

export default Home
