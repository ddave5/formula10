import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import { getGroupListByUserId } from '../../services/group.service';
import type { GroupDTO } from '../../dto/group.dto';

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
  reducers: {
    setGroups: (state, action: PayloadAction<GroupDTO[]>) => {
      state.groups = action.payload;
    },
    addGroup: (state, action: PayloadAction<GroupDTO>) => {
      state.groups.push(action.payload);
    },
    removeGroup: (state, action: PayloadAction<number>) => {
      state.groups = state.groups.filter(group => group.id !== action.payload);
    },
    clearGroups: (state) => {
      state.groups = [];
    },
    renameGroup: (state, action: PayloadAction<{ groupId: number; newName: string }>) => {
      const { groupId, newName } = action.payload;
      const group = state.groups.find(group => group.id === groupId);
      if (group) {
        group.name = newName;
      }
    }
  },
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

export const { setGroups, addGroup, removeGroup, clearGroups, renameGroup } = groupSlice.actions;

export default groupSlice.reducer;
