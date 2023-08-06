import { Injectable } from "@angular/core";
import { Firestore, setDoc, doc, docData, deleteDoc } from '@angular/fire/firestore';
import { from, map, Observable, switchMap, tap } from "rxjs";
import { UserFavorites } from "../models";

@Injectable({
    providedIn: "root"
})
export class FavoritesService {

    constructor(private fireStore: Firestore) {

    }


    addToFavorites(userId: string, coinId: string) {
        const docRef = doc(this.fireStore, 'userfavorites', userId);

        (docData(docRef) as Observable<UserFavorites>).pipe(tap((data) => {
            const newIds= [...new Set([...data.ids, coinId])];
            setDoc(docRef, {userID: userId, ids: newIds}, {merge: false});
        })).subscribe();
    }

    removeFromFavorites(userId: string, coinId: string) {
        const docRef = doc(this.fireStore, 'userfavorites', userId);

        (docData(docRef) as Observable<UserFavorites>)
            .pipe(
                tap((data: UserFavorites) => {
                    const newIds= data.ids.filter(i => i != coinId);
                    return setDoc(docRef, {userID: userId, ids: newIds}, {merge: false});
                })
            ).subscribe();
    }

    loadFromFavorites(id: string): Observable<UserFavorites> {

        const docRef = doc(this.fireStore, 'userfavorites', id);

        return docData(docRef) as Observable<UserFavorites>;
    }
}

