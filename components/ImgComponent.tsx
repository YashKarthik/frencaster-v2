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
      border='solid 2px purple.500'
    />
  );
}

const UserModal = (props: INameFreq) => {
  return (
    <Popover trigger="hover">
      <PopoverTrigger>
        <Box>
          <UserImage avatarUrl={props.avatarUrl!}/>
        </Box>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverHeader>{props.username}</PopoverHeader>
        <PopoverBody><p>Descriptions</p></PopoverBody>
      </PopoverContent>
    </Popover>
  );
}

export default UserModal;
