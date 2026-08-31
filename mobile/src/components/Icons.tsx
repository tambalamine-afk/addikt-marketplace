import React from 'react';
import Svg, { Path, G, Line, Circle, Polyline } from 'react-native-svg';

interface IconProps {
  color: string;
  size: number;
  focused?: boolean;
}

export const HomeIcon = ({ color, size, focused }: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 106.31 107.53">
    <Path fill={focused ? color : "none"} stroke={color} strokeLinejoin="round" strokeWidth="4" d="M49.23,3.59L3.72,47.57c-1.1,1.06-1.72,2.53-1.72,4.06v53.9h35.58v-27.55c0-7.67,6.21-13.88,13.88-13.88h1.19c7.67,0,13.88,6.21,13.88,13.88v27.55h37.79v-53.9c0-1.53-.62-3-1.72-4.06L57.08,3.59c-2.19-2.11-5.66-2.11-7.85,0Z"/>
  </Svg>
);

export const SearchIcon = ({ color, size, focused }: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 106.57 106.94">
    <G fill={focused ? color : "none"} stroke={color} strokeLinejoin="round" strokeWidth="4">
      <Circle cx="42.6" cy="42.6" r="40.6"/>
      <Line x1="76.94" y1="77.39" x2="105.16" y2="105.53"/>
    </G>
  </Svg>
);

export const PublishIcon = ({ color, size, focused }: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 107.53 107.53">
    <G fill={focused ? color : "none"} stroke={color} strokeLinejoin="round" strokeWidth="4">
      <Circle cx="53.76" cy="53.76" r="51.76"/>
      <Line x1="53.76" y1="31.28" x2="53.76" y2="76.25" stroke={focused ? "#fff" : color} />
      <Line x1="76.25" y1="53.76" x2="31.28" y2="53.76" stroke={focused ? "#fff" : color} />
    </G>
  </Svg>
);

export const MessageIcon = ({ color, size, focused }: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 127.56 107.53">
    <G fill={focused ? color : "none"} stroke={color} strokeMiterlimit="10" strokeWidth="4">
      <Path d="M122.92,26.89c-2.32-10.49-12.5-20.11-23.02-22.15-6.16-1.23-22.92-2.74-34.72-2.74h-2.82c-11.79,0-28.55,1.51-34.71,2.75C17.14,6.79,6.97,16.4,4.64,26.89c-1.32,6.38-2.62,15.04-2.64,26.87.02,11.84,1.32,20.5,2.64,26.87,2.32,10.49,12.5,20.11,23.02,22.15,6.17,1.23,22.92,2.74,34.72,2.74h2.82c11.8,0,28.56-1.51,34.72-2.74,10.53-2.04,20.7-11.65,23.02-22.15,1.32-6.37,2.62-15.04,2.64-26.87-.02-11.84-1.32-20.5-2.64-26.87h0Z"/>
      <Polyline points="13.49 32.65 62.99 54.82 114.07 33.56" stroke={focused ? "#fff" : color} />
    </G>
  </Svg>
);

export const ProfilIcon = ({ color, size, focused }: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 82.21 107.53">
    <G fill={focused ? color : "none"} stroke={color} strokeLinejoin="round" strokeWidth="4">
      <Path d="M80.21,91.93c.02,4.64-3.15,8.69-7.65,9.79-10.29,2.54-20.85,3.82-31.45,3.81-10.6,0-21.16-1.29-31.45-3.84-4.49-1.1-7.65-5.13-7.65-9.76,0-21.6,17.51-39.1,39.1-39.1s39.1,17.51,39.1,39.1Z"/>
      <Path d="M41.1,2c-10.33,0-18.7,8.37-18.7,18.7v3.4c0,10.33,8.37,18.7,18.7,18.7s18.7-8.37,18.7-18.7v-3.4c0-10.33-8.37-18.7-18.7-18.7Z" stroke={focused ? "#fff" : color} />
    </G>
  </Svg>
);

export const BagIcon = ({ color, size, focused }: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 117.7 107.07">
    <G fill={focused ? color : "none"} stroke={color} strokeLinejoin="round" strokeWidth="4">
      <Path d="M82.57,38.31c0,13.1-10.62,23.71-23.71,23.71s-23.71-10.62-23.71-23.71"/>
      <Path d="M58.85,104.79s24.33.65,41.12,0c16.79-.65,15.72-19.38,15.72-19.38l-12.49-66.85h-7.54s-7.7-8.93-7.7-8.93l6.84-7.64H22.04s7.51,7.64,7.51,7.64c0,0-5.42,7.03-7.51,8.93h-7.54L2.01,85.41s-1.08,18.73,15.72,19.38c16.79.65,41.12,0,41.12,0Z"/>
      <Line x1="22.04" y1="18.56" x2="95.67" y2="18.56" stroke={focused ? "#fff" : color} />
      <Line x1="22.2" y1="1.55" x2="17.84" y2="18.56" stroke={focused ? "#fff" : color} />
      <Line x1="94.67" y1="1.62" x2="99.87" y2="18.06" stroke={focused ? "#fff" : color} />
    </G>
  </Svg>
);

export const FavIcon = ({ color, size, focused }: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 119.18 107.53">
    <Path fill={focused ? color : "none"} stroke={color} strokeLinejoin="round" strokeWidth="4" d="M57.11,104.11C41.16,94.9,3.89,69.93,2.07,37.04,1.15,20.31,9.02,7.34,22.6,3.2c10.91-3.33,25.84-.07,36.99,13.77C70.74,3.13,85.67-.12,96.58,3.2c13.57,4.15,21.44,17.11,20.52,33.84-1.75,31.72-35.23,55.64-55.04,67.07l-2.46,1.42-2.5-1.42Z"/>
  </Svg>
);
