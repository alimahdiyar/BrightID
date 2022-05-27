// @flow

import React from 'react';
import Svg, { Path, Rect } from 'react-native-svg';
import { ORANGE } from 'src/theme/colors';

type Props = {
  color: string;
  width: number;
  height: number;
};

const VerifiedSticker = ({
  color = ORANGE,
  width = 75,
  height = 16,
}: Props) => (
  <Svg width={width} height={height} viewBox="0 0 75 16" fill="none">
    <Rect x="0.5" y="0.5" width="74" height="15" rx="7.5" stroke={color} />
    <Path
      d="M23.2404 9.938L24.6444 6.041H25.7424L23.8524 11H22.6104L20.7204 6.041H21.8184L23.2404 9.938ZM31.1055 8.282C31.1055 8.45 31.0935 8.597 31.0695 8.723H27.2535C27.2715 9.233 27.4125 9.611 27.6765 9.857C27.9405 10.103 28.2675 10.226 28.6575 10.226C28.9995 10.226 29.2875 10.139 29.5215 9.965C29.7615 9.791 29.9085 9.56 29.9625 9.272H31.0605C30.9945 9.62 30.8565 9.929 30.6465 10.199C30.4365 10.469 30.1635 10.682 29.8275 10.838C29.4915 10.988 29.1165 11.063 28.7025 11.063C28.2225 11.063 27.7965 10.961 27.4245 10.757C27.0585 10.553 26.7705 10.259 26.5605 9.875C26.3505 9.491 26.2455 9.038 26.2455 8.516C26.2455 8 26.3505 7.55 26.5605 7.166C26.7705 6.782 27.0585 6.488 27.4245 6.284C27.7965 6.08 28.2225 5.978 28.7025 5.978C29.1885 5.978 29.6115 6.08 29.9715 6.284C30.3375 6.482 30.6165 6.758 30.8085 7.112C31.0065 7.46 31.1055 7.85 31.1055 8.282ZM30.0705 8.255C30.0825 7.931 30.0255 7.661 29.8995 7.445C29.7795 7.223 29.6115 7.061 29.3955 6.959C29.1855 6.851 28.9545 6.797 28.7025 6.797C28.3005 6.797 27.9645 6.92 27.6945 7.166C27.4245 7.412 27.2775 7.775 27.2535 8.255H30.0705ZM33.1221 7.013C33.2901 6.689 33.5301 6.434 33.8421 6.248C34.1541 6.056 34.5141 5.96 34.9221 5.96V7.076H34.6161C34.1661 7.076 33.8031 7.187 33.5271 7.409C33.2571 7.625 33.1221 7.985 33.1221 8.489V11H32.0961V6.041H33.1221V7.013ZM35.5468 4.601C35.5468 4.427 35.6068 4.283 35.7268 4.169C35.8468 4.055 36.0058 3.998 36.2038 3.998C36.4018 3.998 36.5608 4.055 36.6808 4.169C36.8068 4.283 36.8698 4.427 36.8698 4.601C36.8698 4.775 36.8068 4.916 36.6808 5.024C36.5608 5.132 36.4018 5.186 36.2038 5.186C36.0058 5.186 35.8468 5.132 35.7268 5.024C35.6068 4.916 35.5468 4.775 35.5468 4.601ZM36.7168 6.041V11H35.6908V6.041H36.7168ZM40.2714 5.015C39.8694 4.997 39.5874 5.063 39.4254 5.213C39.2634 5.357 39.1824 5.606 39.1824 5.96V6.041H40.2714V6.923H39.1824V11H38.1474V6.923H37.4724V6.041H38.1474V5.879C38.1474 5.273 38.3244 4.82 38.6784 4.52C39.0324 4.214 39.5634 4.079 40.2714 4.115V5.015ZM40.9521 4.601C40.9521 4.427 41.0121 4.283 41.1321 4.169C41.2521 4.055 41.4111 3.998 41.6091 3.998C41.8071 3.998 41.9661 4.055 42.0861 4.169C42.2121 4.283 42.2751 4.427 42.2751 4.601C42.2751 4.775 42.2121 4.916 42.0861 5.024C41.9661 5.132 41.8071 5.186 41.6091 5.186C41.4111 5.186 41.2521 5.132 41.1321 5.024C41.0121 4.916 40.9521 4.775 40.9521 4.601ZM42.1221 6.041V11H41.0961V6.041H42.1221ZM47.9717 8.282C47.9717 8.45 47.9597 8.597 47.9357 8.723H44.1197C44.1377 9.233 44.2787 9.611 44.5427 9.857C44.8067 10.103 45.1337 10.226 45.5237 10.226C45.8657 10.226 46.1537 10.139 46.3877 9.965C46.6277 9.791 46.7747 9.56 46.8287 9.272H47.9267C47.8607 9.62 47.7227 9.929 47.5127 10.199C47.3027 10.469 47.0297 10.682 46.6937 10.838C46.3577 10.988 45.9827 11.063 45.5687 11.063C45.0887 11.063 44.6627 10.961 44.2907 10.757C43.9247 10.553 43.6367 10.259 43.4267 9.875C43.2167 9.491 43.1117 9.038 43.1117 8.516C43.1117 8 43.2167 7.55 43.4267 7.166C43.6367 6.782 43.9247 6.488 44.2907 6.284C44.6627 6.08 45.0887 5.978 45.5687 5.978C46.0547 5.978 46.4777 6.08 46.8377 6.284C47.2037 6.482 47.4827 6.758 47.6747 7.112C47.8727 7.46 47.9717 7.85 47.9717 8.282ZM46.9367 8.255C46.9487 7.931 46.8917 7.661 46.7657 7.445C46.6457 7.223 46.4777 7.061 46.2617 6.959C46.0517 6.851 45.8207 6.797 45.5687 6.797C45.1667 6.797 44.8307 6.92 44.5607 7.166C44.2907 7.412 44.1437 7.775 44.1197 8.255H46.9367ZM50.9513 5.978C51.4013 5.978 51.7853 6.089 52.1033 6.311C52.4213 6.533 52.6433 6.827 52.7693 7.193V4.34H53.8043V11H52.7693V9.848C52.6433 10.214 52.4213 10.508 52.1033 10.73C51.7853 10.952 51.4013 11.063 50.9513 11.063C50.5193 11.063 50.1323 10.961 49.7903 10.757C49.4543 10.553 49.1903 10.259 48.9983 9.875C48.8063 9.491 48.7103 9.038 48.7103 8.516C48.7103 8 48.8063 7.55 48.9983 7.166C49.1903 6.782 49.4543 6.488 49.7903 6.284C50.1323 6.08 50.5193 5.978 50.9513 5.978ZM51.2663 6.878C50.8103 6.878 50.4443 7.025 50.1683 7.319C49.8983 7.607 49.7633 8.006 49.7633 8.516C49.7633 9.026 49.8983 9.428 50.1683 9.722C50.4443 10.01 50.8103 10.154 51.2663 10.154C51.5543 10.154 51.8123 10.088 52.0403 9.956C52.2683 9.818 52.4483 9.626 52.5803 9.38C52.7123 9.134 52.7783 8.846 52.7783 8.516C52.7783 8.192 52.7123 7.907 52.5803 7.661C52.4483 7.409 52.2683 7.217 52.0403 7.085C51.8123 6.947 51.5543 6.878 51.2663 6.878Z"
      fill={color}
    />
  </Svg>
);

export default VerifiedSticker;
