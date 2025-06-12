import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CacheEntry {
  data: any;
  lastFetched: number;
  ttl: number;
}

interface CacheState {
  data: { [key: string]: CacheEntry };
  ttl: number;
}

interface SetCachePayload {
  key: string;
  data: any;
  ttl?: number;
}

const initialState: CacheState = {
  data: {},
  ttl: 10 * 60 * 1000, 
};

const cacheSlice = createSlice({
  name: 'cache',
  initialState,
  reducers: {
    setCache: (state: CacheState, action: PayloadAction<SetCachePayload>) => {
      const { key, data, ttl } = action.payload;
      state.data[key] = {
        data,
        lastFetched: Date.now(),
        ttl: ttl ?? state.ttl,
      };
    },
    clearCache: (state: CacheState, action: PayloadAction<string>) => {
      const key = action.payload;
      delete state.data[key];
    },
    clearAllCache: (state: CacheState) => {
      state.data = {};
    },
  },
});

export const { setCache, clearCache, clearAllCache } = cacheSlice.actions;
export default cacheSlice.reducer;