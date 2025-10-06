// after Signup and Login
export type UserLoginSignup = {
    id: String;
    email: String
    username: String
    name: String
    bio: String
    token: String
    avatarUrl: String
    createdAt: Date
    updatedAt: Date
};


export type UserProfile = {
    id: String;
    email: String;
    username: String;
    name: String;
    bio: String;
    avatarUrl: String;
    createdAt: Date;
    updatedAt: Date;
    followersCount?: number; // Optional, can be fetched separately
    followingCount?: number; // Optional, can be fetched separately
    views?: number
}