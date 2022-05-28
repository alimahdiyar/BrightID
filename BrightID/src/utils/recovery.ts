import ChannelAPI from 'src/api/channelService';
import { hash } from 'src/utils/encoding';
import { RECOVERY_CHANNEL_TTL } from 'src/utils/constants';

export const buildRecoveryChannelQrUrl = ({
  aesKey,
  url,
  t,
}: RecoveryChannel) => {
  const qrUrl = new URL(url.href);
  qrUrl.searchParams.append('aes', aesKey);
  qrUrl.searchParams.append('t', t);
  return qrUrl;
};

export const uploadRecoveryData = async (
  recoveryData: RecoveryData,
  channelApi: ChannelAPI,
) => {
  const channelId = hash(recoveryData.aesKey);
  const dataObj = {
    signingKey: recoveryData.publicKey,
    timestamp: recoveryData.timestamp,
  };
  const data = JSON.stringify(dataObj);
  await channelApi.upload({
    channelId,
    data,
    dataId: 'data',
    requestedTtl: RECOVERY_CHANNEL_TTL,
  });
};

export const loadRecoveryData = async (
  channelApi: ChannelAPI,
  aesKey: string,
): Promise<{ signingKey: string; timestamp: number }> => {
  const dataString = await channelApi.download({
    channelId: hash(aesKey),
    dataId: 'data',
  });
  const data = JSON.parse(dataString);
  if (!data.signingKey || !data.timestamp) {
    throw new Error(
      'Please ask the connection to reload their QR code and try again',
    );
  }
  return data;
};
