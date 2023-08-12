import { Injectable } from "@angular/core";
import { Auth, signInWithEmailAndPassword, createUserWithEmailAndPassword, user, signOut } from "@angular/fire/auth";
import { LoginData, SignUpData, User } from "../models";
import { Observable, from, map, mergeMap, of, switchMap } from "rxjs";
import { Firestore, doc, docData, setDoc } from "@angular/fire/firestore";

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    constructor(private auth: Auth, private firestore: Firestore) {}

    login({email, password}: LoginData): Observable<User | null> {
        return from(signInWithEmailAndPassword(this.auth, email, password)).pipe(
            mergeMap((userCredential) => {
                if (userCredential.user) {
                    const docRef = doc(this.firestore, `users/${userCredential.user.uid}`);
                    return docData(docRef).pipe(
                        map((data) => {
                            return {
                                uid: userCredential.user.uid,
                                ...data
                            } as User
                        }) 
                    );
                } else {
                    return of(null);
                }
            })
        );
    }

    register(data: SignUpData): Observable<User | null> {
        return from(createUserWithEmailAndPassword(this.auth, data.email, data.password)).pipe(
            mergeMap((userCredential) => {
                console.log(userCredential)
                if (userCredential.user) {
                    const docRef = doc(this.firestore, `users/${userCredential.user.uid}`);
                    return from(setDoc(docRef, { 
                        firstName: data.firstName,
                        lastName: data.lastName,
                        email: data.email,
                        profilePicture: data.profilePicture,
                        role: 'user' 
                    })).pipe(
                        map(() => {
                            return {
                                uid: userCredential.user.uid,
                                firstName: data.firstName,
                                lastName: data.lastName,
                                email: data.email,
                                profilePicture: data.profilePicture,
                                role: 'user'
                            } as User
                        })
                    );
                } else {
                    return of(null);
                }
            })
        );
    }

    logout() {
        return from(signOut(this.auth));
    }

    getUser() {
        return user(this.auth);
    }
}