export interface IUser {
    email: string;
    isAuthenticated: boolean;
    token: string;
}

export interface ILogin {
    email: string;
    password: string;
}
