export interface User {
    uid: string;
    firstName: string;
    lastName: string;
    email: string;
    profilePicture: string;
    role: 'admin' | 'user';
}