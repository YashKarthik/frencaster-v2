import type { NextPage } from 'next';
import { useRouter } from 'next/router';

import Head from 'next/head';
import Link from 'next/link';
import dynamic from 'next/dynamic';

import { IUserComponent } from '../interfaces/profile';
import { testData } from '../sample_data/initProfileData';

import { toSvg } from 'html-to-image';

const UserModal = dynamic(() => import("../components/ImgComponent"), {
  ssr: false,
});

//import UserModal from '../components/ImgComponent';
import SettingsMenu from '../components/SettingsMenu';

import { 
  Dispatch,
  useMemo,
  useState,
  createContext,
  SetStateAction,
  useEffect
} from 'react';

import {
  Box,
  Link as ChakraLink,
  Heading,
  Button,
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
  const router = useRouter();
  const { username } = router.query;

  //console.log('From frens.tsx',body);
  //const allData: IUserComponent[] = JSON.parse(body as string);
  //console.log(allData);
  const [ allData, setAllData ] = useState<IUserComponent[]>(testData);

  useEffect(() => {
    const getData = async (username: string) => {
      const res = await fetch(`/api/${username}`);
      const body = await res.json();

      setAllData(body.result);
      console.log('allData in useEffect', allData);
      console.log('body in useEffect', body.result);
    }

    router.isReady && getData(username as string);
  }, [router.isReady]);

  function handleClick():any {
    const node = document.getElementById('testing-html-to-image');
    toSvg(node!)
        .then(dataUrl => {
                const img = new Image();
                img.src = dataUrl;
                document.body.appendChild(img);
                })
        .catch(err => console.log(err));
  }

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

  let radii: number[][];

  if (allData) {
    radii = useMemo(() => calcCoords(allData.length), [allData, spiralFactor, angleFactor]);
    console.log('useMemo for radii ran', radii);
  } else {
    useMemo(() => console.log('From useMemo: all data not yet fetched.'), [])
  }
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
      <Box h='130vh' display='flex' flexDir='column' bgColor={bgColor} id='testing-html-to-image'>
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
          <br />
          <Button
            my={1}
            textColor={profileColor}
            borderColor={profileColor}
            variant='outline'
            borderRadius='sm'
            _focus={{bgColor: bgColor}}
            _hover={{bgColor: bgColor, borderRadius:10}}
            onClick={handleClick}
          >
              Generate Image
          </Button>
        </Box>

        <Heading
          pb='20'
          textAlign='center'
          fontSize='4xl'
          fontWeight='bold'
          textColor={fgColor}
        >
          {username}&apos; frencircle
        </Heading>

        {allData &&
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
              data={allData[0].data}
              count={allData[0].count}
            />
          </Box>
          {allData.slice(1,).map((u, i) => {
            // slice to exclude caller from the spiral, need to place caller as a seperate entity.
            // passing in `i` as freq to `UserModal` to make further prof pics smaller.
            return (
              <Box
                key={i}
                position='absolute'
                left={(radii[i][0])+ '%'}
                top={(radii[i][1]) + '%'}
              >
              <UserModal
                data={u.data}
                count={u.count}
              />
              </Box>
            );
          })}
        </Box>
        }
      </Box>
    </SpiralContext.Provider>
  );
}

export default Frens;
