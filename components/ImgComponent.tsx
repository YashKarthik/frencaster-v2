import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  Image,
  Box,
  Text,
  Link as ChakraLink,
  Divider
} from '@chakra-ui/react'

import { useEffect, useState } from 'react';
import { INameFreq } from '../pages/api/[username]';
import { fetchProfile, fetchTopCast } from '../utils/metadata';

const UserImage = ({avatarUrl, factor}: {avatarUrl: string, factor: number}) => {
  // using img cuz NextImage doesn't allow * domains, and I can't guess domains (not yet atleast)
  const size = factor == 0 ? 140: 90 - (1.5 * factor);
  return (
    <Image
      src={avatarUrl}
      boxSize={size + 'px'}
      alt={'img'}
      minW={size + 'px'}
      borderRadius='full'
      border='solid 3px'
      borderColor={factor == 0 ? 'yellow.400' : 'purple.500'}
    />
  );
}

interface IMetadata {
  bio           :string;
  address       :string;
  numFollowers  :number;
  topCastText   :string;
  topCastMerkleRoot   :string;
}

const UserModal = (props: INameFreq) => {

  const [metadata, setMetadata] = useState<IMetadata>({bio: '', address: '', numFollowers: 0, topCastText: '', topCastMerkleRoot: ''});

  useEffect(() => {
    const getBio = async () => {
      const { bio, address, numFollowers } = await fetchProfile(props.username);
      const topCast = await fetchTopCast(props.username);

      setMetadata({
        bio: bio,
        address: address,
        numFollowers: numFollowers,
        topCastText: topCast.text,
        topCastMerkleRoot: topCast.merkleRoot
      });
    }

    getBio();
  }, [props]);


  return (
    <Popover trigger={"hover"}>
      <PopoverTrigger>
        <Box maxW={100}>
          <UserImage avatarUrl={props.avatarUrl!} factor={props.freq} />
        </Box>
      </PopoverTrigger>
      <PopoverContent
        minW={200}
        border="solid 2px"
        borderColor='black'
        borderRadius='sm'
      >
        <PopoverHeader fontWeight='bold'>
          @{props.username}
          <Box fontWeight="light">
            Followers: {metadata.numFollowers}
          </Box>
        </PopoverHeader>
        <PopoverBody p='0'>
          <Text p='3' borderBottom='dashed gray 0px'>{metadata.bio}</Text>
          <Divider />
          <Text p='3' borderBottom='dashed gray 0px'>
            <Text fontWeight='bold'>
              Top Cast:
              {/* need to figure out how fc client does cast urls
              <ChakraLink
                fontWeight='light'
                textColor='purple.500'
                pt='1' href={`farcaster://casts/${metadata.topCastMerkleRoot}/${metadata.topCastMerkleRoot}`}
              >
                View in Farcaster
              </ChakraLink>
              */}
            </Text>
            {metadata.topCastText}
          </Text>

          <Divider />

          <ChakraLink
            textColor='purple.500'
            p='3'
            href={`farcaster://profiles/${metadata.address}`}
          >
            View profile in Farcaster
          </ChakraLink>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
}

export default UserModal;

// farcaster://profiles/0x6eFe7a747E8d47E5fA2161Ff2591420830D618de/posts
