import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Link from 'next/link'
import { INameFreq } from './api/[username]';
import UserModal from '../components/ImgComponent';

import { useMemo } from 'react';

import {
  Box,
  Link as ChakraLink,
  Heading,
} from '@chakra-ui/react';

const Frens: NextPage = () => {
  const router = useRouter()
  const { body } = router.query
  const data: INameFreq[] = JSON.parse(body as string);
  console.log(data);

  function calcCoords(n: number) {

    let factor = 2;
    let angle = 0;
    let radii: number[][] = [];
    let prevX = 0;
    let prevY = 0;

    for(let i=0; i < n;i++) {
      let radius = Math.sqrt(i+1) * factor * 10;
      angle += 15 * Math.asin(factor/radius);
      let x = Math.cos(angle)*(radius) + 50
      let y = Math.sin(angle)*(radius) + 50

      //if (x < prevX) x = -x;
      //if (y < prevY) y = -y;

      //prevX = x;
      //prevY = y;

      radii.push([x, y])
    }

    return radii;
  }

  const radii = useMemo(() => calcCoords(data.length), [data]);

  return (
    <Box h='90vh' display='flex' flexDir='column'>
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
        id='wrap-div-for-spiral'
        minW={350}
        minH={350}
        position='relative'
        alignSelf='center'
        top='10%'
      >

        <Box
          position='relative'
          justifyContent='center'
          top='35%'
          left='50%'
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
              left={(radii[i][0])+ '%'}
              top={(radii[i][1]) + '%'}
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
