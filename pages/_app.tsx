import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import { Link, HStack } from '@chakra-ui/react'
import NextLink from 'next/link';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <Component {...pageProps} />
      <HStack flexDir='row' justifyContent='space-evenly' textAlign='center' m='3'>
        <Link color='purple.600' isExternal href="https://twitter.com/_yashkarthik">@_yashkarthik (TW)</Link>
        <Link color='purple.600' href="farcaster://profiles/0x6eFe7a747E8d47E5fA2161Ff2591420830D618de">@yashkarthik (FC)</Link>
        <Link color='purple.600' isExternal href="https://github.com/yashkarthik/frencircle-v2">Source</Link>
        <Link color='purple.600' isExternal href="https://yashkarthik.xyz/archive/friend-caster">How it Works</Link>
        <NextLink href='/faq' passHref>
          <Link color='purple.600'>FAQ</Link>
        </NextLink>
      </HStack>
    </ChakraProvider>
  );
}

export default MyApp
