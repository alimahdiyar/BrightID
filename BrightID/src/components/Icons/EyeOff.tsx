import { GRAY4 } from '@/theme/colors';
import React from 'react';
import Svg, { Path } from 'react-native-svg';

type Props = {
  color?: string;
  highlight?: string;
  width?: number;
  height?: number;
};

const EyeOff = ({
  color = GRAY4,
  width = 24,
  height = 24,
}: Props) => (
    <Svg width={width} height={height} viewBox="0 0 24 24" fill="none">
        <Path 
            d="M14.53 9.46992L9.47001 14.5299C8.82001 13.8799 8.42001 12.9899 8.42001 11.9999C8.42001 10.0199 10.02 8.41992 12 8.41992C12.99 8.41992 13.88 8.81992 14.53 9.46992Z" 
            stroke="#424242" 
            stroke-width="2" 
            stroke-linecap="round" 
            stroke-linejoin="round"
        
        />
        <Path 
            d="M14.53 9.46992L9.47001 14.5299C8.82001 13.8799 8.42001 12.9899 8.42001 11.9999C8.42001 10.0199 10.02 8.41992 12 8.41992C12.99 8.41992 13.88 8.81992 14.53 9.46992Z" 
            stroke={color} 
            stroke-opacity="0.2" 
            stroke-width="2" 
            stroke-linecap="round" 
            stroke-linejoin="round"
        />
        <Path 
            d="M17.82 5.76998C16.07 4.44998 14.07 3.72998 12 3.72998C8.47 3.72998 5.18 5.80998 2.89 9.40998C1.99 10.82 1.99 13.19 2.89 14.6C3.68 15.84 4.6 16.91 5.6 17.77" 
            stroke="#424242" 
            stroke-width="2" 
            stroke-linecap="round" 
            stroke-linejoin="round"
        />
        <Path 
            d="M17.82 5.76998C16.07 4.44998 14.07 3.72998 12 3.72998C8.47 3.72998 5.18 5.80998 2.89 9.40998C1.99 10.82 1.99 13.19 2.89 14.6C3.68 15.84 4.6 16.91 5.6 17.77" 
            stroke={color} 
            stroke-opacity="0.2" 
            stroke-width="2" 
            stroke-linecap="round"
            stroke-linejoin="round"
        />
        <Path 
            d="M8.42001 19.5299C9.56001 20.0099 10.77 20.2699 12 20.2699C15.53 20.2699 18.82 18.1899 21.11 14.5899C22.01 13.1799 22.01 10.8099 21.11 9.39993C20.78 8.87993 20.42 8.38993 20.05 7.92993" 
            stroke="#424242" 
            stroke-width="2" 
            stroke-linecap="round" 
            stroke-linejoin="round"
        />
        <Path 
            d="M8.42001 19.5299C9.56001 20.0099 10.77 20.2699 12 20.2699C15.53 20.2699 18.82 18.1899 21.11 14.5899C22.01 13.1799 22.01 10.8099 21.11 9.39993C20.78 8.87993 20.42 8.38993 20.05 7.92993" 
            stroke={color} 
            stroke-opacity="0.2" 
            stroke-width="2" 
            stroke-linecap="round" 
            stroke-linejoin="round"
        />
        <Path 
            d="M15.51 12.7C15.25 14.11 14.1 15.26 12.69 15.52" 
            stroke="#424242" 
            stroke-width="2" 
            stroke-linecap="round" 
            stroke-linejoin="round"
        />
        <Path 
            d="M15.51 12.7C15.25 14.11 14.1 15.26 12.69 15.52" 
            stroke={color} 
            stroke-opacity="0.2" 
            stroke-width="2" 
            stroke-linecap="round" 
            stroke-linejoin="round"
        />
        <Path 
            d="M9.47 14.53L2 22" 
            stroke="#424242" 
            stroke-width="2" 
            stroke-linecap="round" 
            stroke-linejoin="round"
        />
        <Path 
            d="M9.47 14.53L2 22" 
            stroke={color} 
            stroke-opacity="0.2" 
            stroke-width="2" 
            stroke-linecap="round" 
            stroke-linejoin="round"
        />
        <Path 
            d="M22 2L14.53 9.47" 
            stroke="#424242" 
            stroke-width="2" 
            stroke-linecap="round" 
            stroke-linejoin="round"
        />
        <Path 
            d="M22 2L14.53 9.47" 
            stroke={color} 
            stroke-opacity="0.2" 
            stroke-width="2" 
            stroke-linecap="round" 
            stroke-linejoin="round"
        />

    </Svg>

);

export default EyeOff;
