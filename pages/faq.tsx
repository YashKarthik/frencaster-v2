import type { NextPage } from 'next'
import Head from 'next/head'
import NextLink from 'next/link'

import {
  Box,
  Heading,
  Text,
  HStack,
  Link as ChakraLink
} from '@chakra-ui/react';

const FaqElement = ({heading, text}: any) => (
  <Box p='4' ml='20'>
    <Heading fontSize='xl' fontWeight='medium'>{heading}</Heading>
    <Text textColor='gray.600'>{text}</Text>
  </Box>
);

const Faq: NextPage = () => {
  return (
    <Box h='100vh' display='flex' flexDir='column' justifyContent='space-between'>

      <Head>
        <title>Frencircle</title>
        <meta name="description" content="FAQ about Frencircle" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <NextLink href="/">
        <ChakraLink pl='6' textColor='purple.600'>Home</ChakraLink>
      </NextLink>

      <main>

        <Box >
          <Heading pb='20' textAlign='center' fontSize='4xl' _hover={{textColor:'purple.500'}}>
            Frequently Asked Questions
          </Heading>

          <Box >
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
          </Box>

        </Box>
      </main>

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
  );
}

export default Faq;
