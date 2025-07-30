import { Injectable, inject, signal } from '@angular/core';
import {
  Auth,
  user,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  updatePassword,
  reauthenticateWithCredential,
  EmailAuthProvider,
  User,
} from '@angular/fire/auth';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private auth = inject(Auth);
  user$: Observable<User | null> = user(this.auth);

  currentUser = signal<User | null>(null);
  isLoading = signal(true); 

  constructor() {
    this.user$.subscribe((user) => {
      this.currentUser.set(user);
      this.isLoading.set(false);
    });
  }

  signUp(email: string, password: string) {
    return createUserWithEmailAndPassword(this.auth, email, password);
  }

  signIn(email: string, password: string) {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  resetPassword(email: string) {
    return sendPasswordResetEmail(this.auth, email);
  }

  reauthenticate(email: string, password: string) {
    const user = this.auth.currentUser;
    if (!user) throw new Error('No user logged in');
    const credential = EmailAuthProvider.credential(email, password);
    return reauthenticateWithCredential(user, credential);
  }

  changePassword(newPassword: string) {
    const user = this.auth.currentUser;
    if (!user) throw new Error('No user logged in');
    return updatePassword(user, newPassword);
  }

  signOut() {
    return signOut(this.auth);
  }
}
