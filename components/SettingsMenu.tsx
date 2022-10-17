import { SpiralContext } from '../pages/[username]';

import {
  RadiusSlider,
  AngleSlider,
  ProfileSlider,
  MainProfileSlider,
  TextColorPicker,
  BgColorPicker,
  MainRingColorPicker,
  ProfileRingColorPicker,
} from './SettingsMenuComponents';

import {
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuGroup,
  MenuDivider,
} from '@chakra-ui/react'

import { useContext } from 'react';

export default function SettingsMenu() {

  const { fgColor, bgColor, profileColor } = useContext(SpiralContext)!;

  return (
    <Menu>
      <MenuButton
        as={Button}
        textColor={profileColor}
        borderColor={profileColor}
        variant='outline'
        borderRadius='sm'
        _focus={{bgColor: bgColor}}
        _hover={{bgColor: bgColor, borderRadius:10}}
      >
        Settings
      </MenuButton>

      <MenuList
        maxH='300'
        overflowY='hidden'
        bg={bgColor}
        textColor={fgColor}
        borderRadius='sm'
        borderColor={profileColor}
      >
        <MenuGroup title='Spiral'>
          <MenuItem closeOnSelect={false} _hover={{bgColor: 'rgba(0,0,0,0)'}} _focus={{bgColor: 'rgba(0,0,0,0)'}}><RadiusSlider /></MenuItem>
          <MenuItem closeOnSelect={false} _hover={{bgColor: 'inherit'}}><AngleSlider /></MenuItem>
        </MenuGroup>

        <MenuDivider />

        <MenuGroup title='Profile'>
          <MenuItem closeOnSelect={false} _hover={{bgColor: 'inherit'}}><ProfileSlider /></MenuItem>
          <MenuItem closeOnSelect={false} _hover={{bgColor: 'inherit'}}><MainProfileSlider /></MenuItem>
        </MenuGroup>

        <MenuDivider />

        <MenuGroup title='Colors'>
          <MenuItem closeOnSelect={false} _hover={{bgColor: 'inherit'}}><TextColorPicker /></MenuItem>
          <MenuItem closeOnSelect={false} _hover={{bgColor: 'inherit'}}><BgColorPicker /></MenuItem>
          <MenuItem closeOnSelect={false} _hover={{bgColor: 'inherit'}}><MainRingColorPicker /></MenuItem>
          <MenuItem closeOnSelect={false} _hover={{bgColor: 'inherit'}}><ProfileRingColorPicker /></MenuItem>
        </MenuGroup>
      </MenuList>
    </Menu>
  );
}
