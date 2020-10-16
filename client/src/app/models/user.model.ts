export interface IUser {
    email: string;
    isAuthenticated: boolean;
    token: string;
    refreshToken: string;
}

export interface ILogin {
    email: string;
    password: string;
}
