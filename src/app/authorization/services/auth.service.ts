import { Injectable } from "@angular/core";
import { Auth, signInWithEmailAndPassword, createUserWithEmailAndPassword, user, signOut } from "@angular/fire/auth";
import { LoginData, SignUpData, User } from "../models";
import { Observable, from, map, mergeMap, of, switchMap, take, tap } from "rxjs";
import { Firestore, doc, docData, setDoc } from "@angular/fire/firestore";

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    constructor(
        private auth: Auth, 
        private firestore: Firestore
    ) {}

    login({email, password}: LoginData): Observable<User | null> {
        return from(signInWithEmailAndPassword(this.auth, email, password)).pipe(
            take(1),
            mergeMap((userCredential) => {
                if (userCredential.user) {
                    const docRef = doc(this.firestore, `users/${userCredential.user.uid}`);
                    return docData(docRef).pipe(
                        take(1),
                        map((data) => {
                            const user = {
                                uid: userCredential.user.uid,
                                ...data
                            } as User;
                            console.log('zoro');
                            localStorage.setItem('user', JSON.stringify(user));
                            return user;
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
            take(1),
            mergeMap((userCredential) => {
                if (userCredential.user) {
                    const docRef = doc(this.firestore, `users/${userCredential.user.uid}`);
                    return from(setDoc(docRef, { 
                        firstName: data.firstName,
                        lastName: data.lastName,
                        email: data.email,
                        profilePicture: data.profilePicture,
                        role: 'user' 
                    })).pipe(
                        take(1),
                        map(() => {
                            const user = {
                                uid: userCredential.user.uid,
                                firstName: data.firstName,
                                lastName: data.lastName,
                                email: data.email,
                                profilePicture: data.profilePicture,
                                role: 'user'
                            } as User;
                            localStorage.setItem('user', JSON.stringify(user));
                            return user;
                        })
                    );
                } else {
                    return of(null);
                }
            })
        );
    }

    logout() {
        signOut(this.auth);
        localStorage.removeItem('user');  
    }

    getUser(): Observable<User | null> {
        const user = localStorage.getItem('user');
        if (user) {
            return of(JSON.parse(user));
        } else {
            return of(null);
        }
    }
}