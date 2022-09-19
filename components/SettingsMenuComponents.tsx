import {
  Box,
  Text,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
} from '@chakra-ui/react'

import { ChromePicker } from 'react-color'


import { useContext } from 'react';
import { SpiralContext } from '../pages/frens';

export const RadiusSlider = () => {

  const {
    spiralFactor,
    setSpiralFactor,
  } = useContext(SpiralContext)!;

  return (
    <Box minW='100%'>
      <Text>Radius Factor: {spiralFactor}</Text>
      <Slider
        defaultValue={2}
        colorScheme='purple'
        max={10}
        min={0}
        aria-label='spiral-radius-slider'
        onChange={(val) => setSpiralFactor(val)}
      >
        <SliderTrack>
          <SliderFilledTrack />
        </SliderTrack>
        <SliderThumb />
      </Slider>
    </Box>
  );
}

export const AngleSlider = () => {

  const {
    angleFactor,
    setAngleFactor,
  } = useContext(SpiralContext)!;

  return (
    <Box minW='100%'>
      <Text>Angle Factor: {angleFactor}</Text>
      <Slider
        defaultValue={15}
        colorScheme='purple'
        max={30}
        min={0}
        aria-label='spiral-angle-slider'
        onChange={(val) => setAngleFactor(val)}
      >
        <SliderTrack>
          <SliderFilledTrack />
        </SliderTrack>
        <SliderThumb />
      </Slider>
    </Box>
  );
}

export const ProfileSlider = () => {

  const {
    profileSize,
    setProfileSize
  } = useContext(SpiralContext)!;

  return (
    <Box minW='100%'>
      <Text>Profile Size: {profileSize}</Text>
      <Slider
        defaultValue={90}
        colorScheme='purple'
        max={110}
        min={70}
        aria-label='main-profile-size-slider'
        onChange={(val) => setProfileSize(val)}
      >
        <SliderTrack>
          <SliderFilledTrack />
        </SliderTrack>
        <SliderThumb />
      </Slider>
    </Box>
  );
}

export const MainProfileSlider = () => {

  const {
    mainProfileSize,
    setMainProfileSize
  } = useContext(SpiralContext)!;

  return (
    <Box minW='100%'>
      <Text>Main Profile Size: {mainProfileSize}</Text>
      <Slider
        defaultValue={120}
        colorScheme='purple'
        max={150}
        min={80}
        aria-label='main-profile-size-slider'
        onChange={(val) => setMainProfileSize(val)}
      >
        <SliderTrack>
          <SliderFilledTrack />
        </SliderTrack>
        <SliderThumb />
      </Slider>
    </Box>
  );
}

export const TextColorPicker = () => {
  const {
    fgColor,
    setFgColor
  } = useContext(SpiralContext)!;

  return (
    <Box minW='100%'>
      <Text py='2'>Text color: {fgColor}</Text>
      <ChromePicker
        color={fgColor}
        onChangeComplete={c => setFgColor(c.hex)}
      />
    </Box>
  );
}

export const BgColorPicker = () => {
  const {
    bgColor,
    setBgColor
  } = useContext(SpiralContext)!;

  return (
    <Box minW='100%'>
      <Text py='2'>Background color: {bgColor}</Text>
      <ChromePicker
        color={bgColor}
        onChange={c => setBgColor(c.hex)}
      />
    </Box>
  );
}

export const ProfileRingColorPicker = () => {
  const {
    profileColor,
    setProfileColor
  } = useContext(SpiralContext)!;

  return (
    <Box minW='100%'>
      <Text py='2'>Profile ring color: {profileColor}</Text>
      <ChromePicker
        color={profileColor}
        onChangeComplete={c => setProfileColor(c.hex)}
      />
    </Box>
  );
}

export const MainRingColorPicker = () => {
  const {
    mainProfileColor,
    setMainProfileColor
  } = useContext(SpiralContext)!;

  return (
    <Box minW='100%'>
      <Text py='2'>Main profile ring color: {mainProfileColor}</Text>
      <ChromePicker
        color={mainProfileColor}
        onChangeComplete={c => setMainProfileColor(c.hex)}
      />
    </Box>
  );
}
