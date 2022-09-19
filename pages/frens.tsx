import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Link from 'next/link'
import { INameFreq } from './api/[username]';
import UserModal from '../components/ImgComponent';
import SettingsMenu from '../components/SettingsMenu';

import { useMemo, useState, createContext, Dispatch, SetStateAction } from 'react';

import {
  Box,
  Link as ChakraLink,
  Heading,
} from '@chakra-ui/react';

interface ISpiralContext {
  bgColor             :string;
  fgColor             :string;
  spiralFactor        :number;
  angleFactor         :number;
  profileColor        :string;
  mainProfileColor    :string;
  profileSize         :number;
  mainProfileSize     :number;
  setBgColor          :Dispatch<SetStateAction<string>>;
  setFgColor          :Dispatch<SetStateAction<string>>;
  setSpiralFactor     :Dispatch<SetStateAction<number>>;
  setAngleFactor      :Dispatch<SetStateAction<number>>;
  setProfileColor     :Dispatch<SetStateAction<string>>;
  setMainProfileColor :Dispatch<SetStateAction<string>>;
  setProfileSize      :Dispatch<SetStateAction<number>>;
  setMainProfileSize  :Dispatch<SetStateAction<number>>;

}

export const SpiralContext = createContext<ISpiralContext | null>(null);

const Frens: NextPage = () => {
  const router = useRouter()
  const { body } = router.query
  const data: INameFreq[] = JSON.parse(body as string);
  console.log(data);

  const [ bgColor           , setBgColor          ] = useState('white');
  const [ fgColor           , setFgColor          ] = useState('black');
  const [ spiralFactor      , setSpiralFactor     ] = useState(2);
  const [ angleFactor       , setAngleFactor      ] = useState(15);
  const [ profileColor      , setProfileColor     ] = useState('purple.500');
  const [ mainProfileColor  , setMainProfileColor ] = useState('yellow.400');
  const [ profileSize       , setProfileSize      ] = useState(90);
  const [ mainProfileSize   , setMainProfileSize  ] = useState(120);

  function calcCoords(n: number) {

    let factor = spiralFactor;
    let angle = 0;
    let radii: number[][] = [];

    for(let i=0; i < n;i++) {
      let radius = Math.sqrt(i+1) * factor * 10;
      angle += angleFactor * Math.asin(factor/radius);
      let x = Math.cos(angle)*(radius) + 50
      let y = Math.sin(angle)*(radius) + 50

      radii.push([x, y])
    }

    return radii;
  }

  const radii = useMemo(() => calcCoords(data.length), [data]);

  return (
    <SpiralContext.Provider value={{
      bgColor,
      fgColor,
      spiralFactor,
      angleFactor,
      profileColor,
      mainProfileColor,
      profileSize,
      mainProfileSize,
      setBgColor,
      setFgColor,
      setSpiralFactor,
      setAngleFactor,
      setProfileColor,
      setMainProfileColor,
      setProfileSize,
      setMainProfileSize,
    }}>
      <Box h='130vh' display='flex' flexDir='column' bgColor={bgColor}>
        <Head>
          <title>Frencircle</title>
          <meta name="description" content="Visualize your Farcaster interaction circle!" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <Link href="/">
          <ChakraLink pl='6' textColor={profileColor}>Home</ChakraLink>
        </Link>

        <Box p='4'>
          <SettingsMenu />
        </Box>

        <Heading
          pb='20'
          textAlign='center'
          fontSize='4xl'
          fontWeight='bold'
          textColor={fgColor}
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
    </SpiralContext.Provider>
  );
}


export default Frens;
