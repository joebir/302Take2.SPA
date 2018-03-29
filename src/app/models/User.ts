import { Photo } from "./Photo";

export interface User {
    id: number;
    username: string;
    specialty: string;
    age: number;
    knownAs: string;
    created: Date;
    lastActive: Date;
    photoUrl: string;
    city: string;
    state: string;
    interests?: string;
    introduction?: string;
    lookingFor?: string;
    photos?: Photo[];
}