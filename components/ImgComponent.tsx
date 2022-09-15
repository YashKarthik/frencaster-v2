import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  Image,
  Box,
  Text,
  Link as ChakraLink
} from '@chakra-ui/react'

import { useEffect, useState } from 'react';
import { INameFreq } from '../pages/api/[username]';
import { fetchProfile, fetchTopCast } from '../utils/metadata';

const UserImage = ({avatarUrl}: {avatarUrl: string}) => {
  // using img cuz NextImage doesn't allow * domains, and I can't guess domains (not yet atleast)
  return (
    <Image
      src={avatarUrl}
      width={100}
      height={100}
      alt={'img'}
      maxW='full'
      borderRadius='full'
      border='solid 3px'
      borderColor='purple.500'
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
    <Popover trigger="hover">
      <PopoverTrigger>
        <Box maxW={100}>
          <UserImage avatarUrl={props.avatarUrl!}/>
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
        <PopoverBody>
          <Text p='1' borderBottom='dashed gray 1px'>{metadata.bio}</Text>

          <Text p='1' borderBottom='dashed gray 1px'>
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

          <ChakraLink
            textColor='purple.500'
            pt='1'
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
