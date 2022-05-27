import { SocialMediaVariationIds } from 'src/components/EditProfile/socialMediaVariations';
import { BrightIdNetwork } from 'src/components/Apps/types.d';

type CreateSocialMediaRequest = {
  variation: string | SocialMediaVariationIds;
  profileHashes: string[];
  network: BrightIdNetwork;
};

type CreateSocialMediaResponse = {
  appUserId: string;
  token: string;
  variation: string | SocialMediaVariationIds;
  network: BrightIdNetwork;
};

type UpdateSocialMediaRequest = {
  token: string;
  profileHashes: string[];
};

type SocialMediaQueryRequest = {
  network: BrightIdNetwork;
  profileHashes: string[];
};

type SocialMediaQueryResponse = string[];
