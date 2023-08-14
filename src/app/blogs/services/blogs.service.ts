import { Injectable } from "@angular/core";
import { Firestore, doc, setDoc, collection, docData, collectionData } from "@angular/fire/firestore";
import { Blog } from "../models";
import { Observable, of } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class BlogsService {
    constructor(
        private firestore: Firestore
    ) {}

    addBlog(blog: Blog) {
        const docRef = doc(collection(this.firestore, 'blogs'));
        blog.id = docRef.id;
        setDoc(docRef, blog);
    }

    getBlog(id: string | undefined): Observable<Blog | null> {
        if (id) {
            const docRef = doc(this.firestore, `blogs/${id}`)
            return docData(docRef) as Observable<Blog | null>;
        } else {
            return of(null);
        }
    }

    getBlogs(): Observable<Blog[]> {
        return collectionData(collection(this.firestore, 'blogs'), { idField: 'id' }) as Observable<Blog[]>;
    }
}