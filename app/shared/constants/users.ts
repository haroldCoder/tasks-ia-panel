interface UserState {
    success: boolean | null;
    error: any | null;
    loading: boolean;
    data: any | null;
    loadingUpdate: boolean | null;
    successUpdate: boolean | null;
}

export const usersState : UserState = {
    success: null,
    error: null,
    loading: false,
    data: null,
    loadingUpdate: null,
    successUpdate: null
};