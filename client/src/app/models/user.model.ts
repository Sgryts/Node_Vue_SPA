export default interface IUser {
    email: string;
    password: string;
    isAuthenticated: boolean;
    token?: string;
}
