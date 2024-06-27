export interface User {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    role: 'OWNER' | 'WALKER' | 'ADMIN';
}

export interface SignInData {
    email: string;
    password: string;
}

export interface SignUpData {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    role: string;
}