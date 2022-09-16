import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Link from 'next/link'
import { INameFreq } from './api/[username]';
import UserModal from '../components/ImgComponent';

import { useMemo } from 'react';

import { Box, Link as ChakraLink, Heading } from '@chakra-ui/react';

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

      <Box
        width={{lg: '100%', base: '50%'}}
        height='100%'
        position='relative'
      >
        <Box
          position='absolute'
          left={radii[0][0] + 650}
          top={radii[0][1] + 150}
        >
          <UserModal
            avatarUrl={data[0].avatarUrl}
            username={data[0].username}
            freq={0}
          />
        </Box>
        {data.slice(1,).map((user, i) => {
          // slice to exclude caller from the spiral, need to place caller as a seperate entity.
          // passing in `i` as freq to `UserModal` to make further prof pics smaller.
          return (
            <Box
              position='absolute'
              left={radii[i][0] + 650}
              top={radii[i][1] + 300}
            >
              <UserModal
                avatarUrl={user.avatarUrl}
                username={user.username}
                freq={i+1}
              />
            </Box>
          );
        })}

      </Box>
    </Box>
  );
}


export default Frens;
