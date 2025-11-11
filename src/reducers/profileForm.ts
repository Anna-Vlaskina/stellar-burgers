import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TUser } from '../utils/types';
import { updateUser } from './user';

export type TProfileFormState = {
  form: TUser;
  isEdited: boolean;
};

const initialState: TProfileFormState = {
  form: {
    name: '',
    email: ''
  },
  isEdited: false
};

export const profileFormSlice = createSlice({
  name: 'profileForm',
  initialState,
  reducers: {
    setProfileForm: (state, action: PayloadAction<TUser>) => {
      state.form = action.payload;
      state.isEdited = false;
    },

    setProfileFormValue: (
      state,
      action: PayloadAction<{ field: keyof TUser; value: string }>
    ) => {
      const { field, value } = action.payload;
      state.form[field] = value;
      state.isEdited = true;
    },

    resetProfileForm: (state, action: PayloadAction<TUser>) => {
      state.form = action.payload;
      state.isEdited = false;
    }
  },

  extraReducers: (builder) => {
    builder.addCase(updateUser.fulfilled, (state, action) => {
      if (action.payload) {
        state.form = action.payload;
        state.isEdited = false;
      }
    });
  }
});

export const { setProfileForm, setProfileFormValue, resetProfileForm } =
  profileFormSlice.actions;
export default profileFormSlice.reducer;
