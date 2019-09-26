export default interface IUser {
    id: number;
    name: string;
    password: string;
    confirmPassword: string;
}

export default interface IAuth {
    email: string;
    password: string
}
