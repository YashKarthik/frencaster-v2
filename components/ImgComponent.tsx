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

import { useContext, useEffect, useState } from 'react';
import { SpiralContext } from '../pages/[username]';
import { IUserComponent } from '../interfaces/profile';

const UserImage = ({avatarUrl, factor}: {avatarUrl: string, factor: number}) => {
  const {
    fgColor,
    bgColor,
    profileSize,
    mainProfileSize,
    profileColor,
    mainProfileColor,
  } = useContext(SpiralContext)!;

  const size = factor == 0 ? mainProfileSize : profileSize - (1.5 * factor);
  // using normal img cuz NextImage doesn't allow * domains, and fc allows domains for pfp.
  return (
    <Image
      src={avatarUrl}
      boxSize={size + 'px'}
      alt={'profile image'}
      minW={size + 'px'}
      borderRadius='full'
      border='solid 3px'
      borderColor={factor == 0 ? mainProfileColor : profileColor}
    />
  );
}

const UserModal = (props: IUserComponent) => {

  const {
    fgColor,
    bgColor,
  } = useContext(SpiralContext)!;

  return (
    <Popover trigger={"hover"}>
      <PopoverTrigger>
        <Box maxW={100}>
          <UserImage avatarUrl={props.data.user.avatar.url} factor={props.count} />
        </Box>
      </PopoverTrigger>
      <PopoverContent
        textColor={fgColor}
        bgColor={bgColor}
        minW={200}
        border="solid 2px"
        borderColor={fgColor}
        borderRadius='sm'
      >
        <PopoverHeader fontWeight='bold'>
          @{props.data.user.username}
          <Box fontWeight="light">
            Followers: {props.data.user.followerCount}
          </Box>
        </PopoverHeader>
        <PopoverBody p='0'>
          <Text p='3' borderBottom='dashed gray 0px'>{props.data.user.profile.bio.text}</Text>
          <Divider />
          <Text p='3' borderBottom='dashed gray 0px'>
            <Text fontWeight='bold'>
              Latest Cast:
              <ChakraLink
                fontWeight='light'
                textColor='purple.500'
                pt='1' href={`farcaster://casts/${props.data.latestCast.merkleRoot}/${props.data.latestCast.merkleRoot}`}
              >
                View in Farcaster
              </ChakraLink>
            </Text>
            {props.data.latestCast.body.data.text}
          </Text>

          <Divider />

          <ChakraLink
            textColor='purple.500'
            p='3'
            href={`farcaster://profiles/${props.data.user.address}`}
          >
            View profile in Farcaster
          </ChakraLink>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
}

export default UserModal;
