/**
 * @file Form component, which when submitted fetches the data from /api
 */

import { useRouter, NextRouter } from 'next/router';
import { FormEvent, MouseEvent, useState } from 'react';

import {
  Input,
  InputGroup,
  InputLeftAddon,
  Container,
  Button
} from '@chakra-ui/react'

const submitUname = async (event: FormEvent<HTMLFormElement>, router: NextRouter) => {

  event.preventDefault();
  const name = event.currentTarget!.username.value;

  console.log(name);
  console.log("Creating your interaction circle");

  //const res = await fetch(`/api/${name}`);
  //const body  = await res.json();
  //// logs to browser console
  //console.log('From UserInput.tsx', body);

  //router.push({
  //  pathname: `/frens`,
  //  query: { body: body }
  //}, '/frens', );

  router.push({
    pathname: `/${name}`,
  });
};

export default function UsernameInput() {
  const router  = useRouter();
  const [buttonText, setButtonText] = useState('Generate');

  return (
    <form onSubmit={e => {
      submitUname(e, router)
      setButtonText('Loading...')
    }}>
      <Container maxW='40ch' textAlign='center' pt='10'>
        <InputGroup
          border="solid black 1px"
          borderRadius='sm'
        >
          <InputLeftAddon borderRadius='sm' bg='white'>@</InputLeftAddon>
          <Input
            name='username'
            type='text'
            placeholder='yashkarthik'
            borderRadius='sm'
            bg='white'
          />
        </InputGroup>

        <Button
          border="solid black 2px"
          borderRadius='sm'
          bg='white'
          p='1' mt='3'
          fontSize='lg'
          type="submit"
          _hover={{
            borderColor: 'purple.600',
            textColor: 'purple.600'
          }}
        >
          {buttonText}
        </Button>
      </Container>
    </form>
  )
}
