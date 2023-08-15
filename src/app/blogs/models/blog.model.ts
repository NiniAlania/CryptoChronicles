import { Timestamp } from "@angular/fire/firestore";

export interface Blog {
    id: string;
    author: string;
    title: string;
    content: string;
    imageUrl: string;
    createdAt: Timestamp;
}