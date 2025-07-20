export interface UserDataUsers{
    email?: string;
    username?: string;
    celphone?: string;
}

export interface UserState {
    success: boolean | null;
    error: any | null;
    loading: boolean;
    data: UserDataUsers | null;
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