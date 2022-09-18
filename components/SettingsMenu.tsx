import { SpiralContext } from '../pages/frens';

import {
  Button,
  Box,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  SliderMark,
} from '@chakra-ui/react'

import { useContext } from 'react';

export default function SettingsMenu() {

  const { fgColor, bgColor } = useContext(SpiralContext);

  return (
    <Menu>
      <MenuButton
        as={Button}
        colorScheme='purple'
        variant='outline'
        borderRadius='sm'
      >
        Settings
      </MenuButton>

      <MenuList
        borderColor='purple.500'
        borderRadius='sm'
        bg={bgColor}
        textColor={fgColor}
      >
        <MenuGroup title='Spiral'>
          <MenuItem>Radius Factor</MenuItem>
          <MenuItem>Angle Factor</MenuItem>
        </MenuGroup>

        <MenuDivider />

        <MenuGroup title='Colors'>
          <MenuItem>Main Profile Color</MenuItem>
          <MenuItem>Profile Color</MenuItem>
        </MenuGroup>

        <MenuDivider />

        <MenuGroup title='Profile'>
          <MenuItem>Main Profile Size</MenuItem>
          <MenuItem>Profile Size</MenuItem>
        </MenuGroup>
      </MenuList>
    </Menu>
  );
}
