import { createAsyncThunk, AsyncThunkPayloadCreator } from '@reduxjs/toolkit';
import { setCache } from './cacheSlice';

interface CacheState {
  data: {
    [key: string]: {
      data: any;
      lastFetched: number;
      ttl: number;
    };
  };
  ttl: number;
}

interface RootState {
  cache: CacheState;
  [key: string]: any;
}

interface CreateCachedThunkParams<Arg, Returned> {
  typePrefix: string;
  fetchFunction: (arg: Arg) => Promise<any>;
  cacheKeyGenerator?: (arg: Arg, api: { getState: () => RootState }) => string;
  ttl?: number;
  responseType?: 'json' | 'boolean' | 'data'
}

export const createCachedThunk = <Returned, Arg = void>({
  typePrefix,
  fetchFunction,
  cacheKeyGenerator = (arg) => JSON.stringify(arg),
  ttl,
  responseType = 'json'
}: CreateCachedThunkParams<Arg, Returned>) => {
  const thunk: AsyncThunkPayloadCreator<Returned, Arg, { state: RootState }> = async (
    arg,
    { dispatch, getState, rejectWithValue },
  ) => {
    const cacheKey = `${typePrefix}/${cacheKeyGenerator(arg, { getState })}`;
    const cacheState = getState().cache.data[cacheKey];

    if (cacheState && cacheState.lastFetched) {
      const isCacheValid =
        Date.now() - cacheState.lastFetched < (cacheState.ttl || getState().cache.ttl);
      if (isCacheValid) {
        return cacheState.data as Returned;
      }
    }

    try {
      const response = await fetchFunction(arg);
      const data = responseType === 'json' ? await response.json() : response as Returned;
      dispatch(setCache({ key: cacheKey, data, ttl }));
      return data;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Unknown error');
    }
  };

  return createAsyncThunk<Returned, Arg, { state: RootState }>(
    typePrefix,
    thunk,
    {
      condition: (arg, { getState }) => {
        return true;
      },
    },
  );
};