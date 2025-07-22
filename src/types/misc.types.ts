export type tokenPayload = {
    id: string;
    email: string;
    username: string;
    fullName: string;
    phone_number: string;
    exp?: number; // Optional expiration timestamp
    iat?: number; // Optional issued at timestamp

};