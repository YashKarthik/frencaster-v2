import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  Image,
  Box
} from '@chakra-ui/react'

import { INameFreq } from '../pages/api/[username]';

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

const UserModal = (props: INameFreq) => {
  return (
    <Popover trigger="hover">
      <PopoverTrigger>
        <Box maxW={100}>
          <UserImage avatarUrl={props.avatarUrl!}/>
        </Box>
      </PopoverTrigger>
      <PopoverContent
        maxW={200}
        border="solid 2px"
        borderColor='black'
        borderRadius='sm'
      >
        <PopoverHeader>
          @{props.username}
        </PopoverHeader>
        <PopoverBody>
          <p>Bio</p>
          <p>Top cast</p>
          <p>Karma</p>
          {/* Need to add other stuff like karma, bio, top tweet etc*/}
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
}

export default UserModal;
