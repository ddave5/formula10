import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getGroupListByUserId } from '../../services/groupService';
import { GroupDTO } from '../../dto/group.dto';

export const fetchGroupList = createAsyncThunk(
  'groups/fetchGroupList',
  async (userId: number) => {
    const response = await getGroupListByUserId(userId);
    return response;
  }
);

interface GroupState {
  groups: GroupDTO[];
  loading: boolean;
  error: string | null;
}

const initialState: GroupState = {
  groups: [],
  loading: false,
  error: null,
};

// Redux slice
const groupSlice = createSlice({
  name: 'groups',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchGroupList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchGroupList.fulfilled, (state, action) => {
        state.groups = action.payload;
        state.loading = false;
      })
      .addCase(fetchGroupList.rejected, (state, action) => {
        state.error = 'Failed to fetch groups';
        state.loading = false;
      });
  },
});

export default groupSlice.reducer;
