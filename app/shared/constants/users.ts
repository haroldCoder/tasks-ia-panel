interface UserState {
    success: boolean | null;
    error: any | null;
    loading: boolean;
    data: any | null;
}

export const usersState : UserState = {
    success: null,
    error: null,
    loading: false,
    data: null
};