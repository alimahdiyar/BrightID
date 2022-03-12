import {
  createSlice,
  createEntityAdapter,
  createSelector,
  PayloadAction,
  Update,
} from '@reduxjs/toolkit';

import {
  SocialMediaType,
  initialSocialMediaVariations,
} from '@/components/EditProfile/socialMediaVariations';

const socialMediaVariationAdapter = createEntityAdapter<SocialMediaVariation>();
const emptyInitialState = socialMediaVariationAdapter.getInitialState();
const socialMediaVariationsInitialState =
  socialMediaVariationAdapter.upsertMany(
    emptyInitialState,
    initialSocialMediaVariations,
  );

const initialState = {
  socialMediaVariations: socialMediaVariationsInitialState,
  lastUpdateTimestamp: null,
};

const socialMediaVariationSlice = createSlice({
  name: 'socialMediaVariation',
  initialState,
  reducers: {
    upsertSocialMediaVariations(
      state,
      action: PayloadAction<SocialMediaVariation[]>,
    ) {
      state.lastUpdateTimestamp = Date;
      state.socialMediaVariations = socialMediaVariationAdapter.upsertMany(
        state.socialMediaVariations,
        action.payload,
      );
    },
  },
});

export const { upsertSocialMediaVariations } =
  socialMediaVariationSlice.actions;

export const {
  selectById: selectSocialMediaVariationById,
  selectAll: selectAllSocialMediaVariations,
} = socialMediaVariationAdapter.getSelectors(
  (state: State) => state.socialMediaVariations.socialMediaVariations,
);

export const selectAllSocialMediaVariationsByType = () =>
  createSelector(
    selectAllSocialMediaVariations,
    (_: State, type: SocialMediaType) => type,
    (socialMediaVariations, type) =>
      socialMediaVariations.filter((item) => item.type === type),
  );

export default socialMediaVariationSlice.reducer;
