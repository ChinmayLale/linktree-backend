import { User } from "@prisma/client";

export type tokenPayload = {
    id: string;
    email: string;
    username: string;
    fullName: string;
    phone_number: string;
    exp?: number; // Optional expiration timestamp
    iat?: number; // Optional issued at timestamp

};

export type SafeUser = Omit<User, "password">;


export interface UpdateUserProfileInput {
    name?: string;
    bio?: string;
    tags?: string[];
    avatarUrl?: string;
    isProfilePublic?: boolean;
}

export interface MusicMetadata {
    artist: string;
    duration: string;
    thumbnail?: string;
}

export interface VideoMetadata {
    thumbnail?: string;
    duration: string;
    description?: string;
}

export interface EventMetadata {
    date: string;
    location: string;
    description?: string;
}

export interface GalleryMetadata {
    images: string[];
}

export type LinkMetadata =
    | MusicMetadata
    | VideoMetadata
    | EventMetadata
    | GalleryMetadata
    | Record<string, unknown>; // fallback for others

export type LinkType = "music" | "video" | "event" | "gallery" | "contact" | "social" | "default";

export interface LinkItem {
    id: string;
    type: LinkType;
    title: string;
    url: string;
    icon?: string;
    color: string;
    active: boolean;
    style: string;
    metadata?: LinkMetadata;
    thumbnail?: string; // Optional thumbnail for links
    clicks?: number; // Optional clicks count for analytics
    duration?: string; // Optional duration for music or video links
    images?: string[]; // Optional images for gallery links
}