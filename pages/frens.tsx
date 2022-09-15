import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Link from 'next/link'
import { INameFreq } from './api/[username]';
import UserModal from '../components/ImgComponent';

import { useMemo } from 'react';

import { Box, Link as ChakraLink, Heading, Grid } from '@chakra-ui/react';

const Frens: NextPage = () => {
  const router = useRouter()
  const { body } = router.query
  const data: INameFreq[] = JSON.parse(body as string);
  console.log(data);

  function calcCoords(n:number) {

    let angle = 0;
    let radii: number[][] = [];

    for(let i=0; i < n;i++) {
      let radius = Math.sqrt(i+1) * 80;
      angle += 15 * Math.asin(8/radius);
      let x = Math.cos(angle)*(radius)
      let y = Math.sin(angle)*(radius)

      radii.push([x, y])
    }

    return radii;
  }

  const radii = useMemo(() => calcCoords(data.length), [data]);

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

      <Box>
        {data.map((user, i) => {

          return (
            <Box
              position='absolute'
              left={radii[i][0] + 650}
              top={radii[i][1] + 350}
            >
              <UserModal
                avatarUrl={user.avatarUrl}
                username={user.username}
                freq={user.freq}
              />
            </Box>
          );
        })}

      </Box>
    </Box>
  );
}


export default Frens;
