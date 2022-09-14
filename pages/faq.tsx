import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'

import { Box,
         Heading,
         Text,
         Link as ChakraLink
} from '@chakra-ui/react';

import UserModal from '../components/ImgComponent';

const FaqElement = ({heading, text}: any) => (
  <Box p='4' ml='20'>
    <Heading fontSize='xl' fontWeight='medium'>{heading}</Heading>
    <Text textColor='gray.600'>{text}</Text>
  </Box>
);

const Faq: NextPage = () => {
  return (
    <Box h='90vh'>

      <Head>
        <title>Frencircle</title>
        <meta name="description" content="FAQ about Frencircle" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Link href="/">
        <ChakraLink pl='6' textColor='purple.600'>Home</ChakraLink>
      </Link>

      <UserModal
        avatarUrl='https://lh3.googleusercontent.com/W_MM3NN-i9OYxM3XPJjwpb5mkMLjJFZJjnEXsvrhiTwirSFhRjyAa3qTzV63ago6NkX9qeesi20hoK9fHdhiE-SqICH0vPcTm3Dl'
        freq={0}
        username='yashkarthik'
      />

      <main>

        <Box >
          <Heading pt='10' pb='20' textAlign='center' fontSize='4xl' _hover={{textColor:'purple.500'}}>
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
    </Box>
  );
}

export default Faq;
