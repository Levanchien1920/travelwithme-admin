import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { User } from '../_models';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(private http: HttpClient) {
    // this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(sessionStorage.getItem('currentUser')));
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  login(email: string, password: string) {
    console.log('login');
    console.log('url ' + environment.apiUrl);
    debugger;
    return this.http.post<any>(`${environment.apiUrl}/auth/login`, { email, password })
      // .pipe(map(user => {
      //     // store user details and jwt token in local storage to keep user logged in between page refreshes
      //     // sessionStorage.setItem('currentUser', JSON.stringify(user.data));
      //     // let tokenStr = "Bearer " + user.token;
      //     // localStorage.setItem("token", tokenStr);
      //     //  const {token, info} = user.data;
      //     //  localStorage.setItem("token", token);

      //     const{token, info} = user.data;
      //     console.log('user ' + user);
      //     debugger;
      //     if(user.status === 200) {
      //       console.log('-----> 200');
      //       // localStorage.setItem("token", token);
      //       // localStorage.setItem("id", info.id);
      //       // localStorage.setItem("username", info.username);
      //       // localStorage.setItem("fullname", info.email);
      //       // localStorage.setItem("roleNames", info.roleNames);
      //       localStorage.setItem('currentUser', JSON.stringify(user.data));
      //       this.currentUserSubject.next(user.data);
      //     }
      //     // localStorage.setItem('currentUser', JSON.stringify(user.data));
      //     // this.currentUserSubject.next(user.data);
      //   return user;
      // }));
  }

  forgotPassword(email: string) {
    return this.http.post<any>(`${environment.apiUrl}/users/get-token-admin`, { email })
      .pipe(map(result => {
        return result;
      }));
  }

  changePassword(resetLink: string, password: string) {
    return this.http.post<any>(`${environment.apiUrl}/users/reset-password`, { reset_link: resetLink, new_password: password })
      .pipe(map(result => {
        return result;
      }));
  }

  logout() {
    // remove user from local storage to log user out
    // sessionStorage.removeItem('currentUser');
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }
}
