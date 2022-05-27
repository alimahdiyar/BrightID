import { SocialMediaVariationIds } from 'src/components/EditProfile/socialMediaVariations';
import { extractDigits, parsePhoneNumber } from 'src/utils/phoneUtils';
import { hashSocialProfile } from 'src/utils/cryptoHelper';

export function generateSocialProfileHashes(
  profile: string,
  socialMediaVariationId: string,
): string[] {
  if (socialMediaVariationId === SocialMediaVariationIds.PHONE_NUMBER) {
    const { number } = parsePhoneNumber(profile);
    const phoneNumberDigits = extractDigits(profile);
    return [
      hashSocialProfile(number),
      hashSocialProfile(phoneNumberDigits),
      hashSocialProfile(
        phoneNumberDigits.substring(phoneNumberDigits.length - 7),
      ),
    ];
  }
  return [hashSocialProfile(profile)];
}
