import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map, Observable, of, ReplaySubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IAddress } from '../shared/models/address';
import { IUser } from '../shared/models/user';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  public baseUrl = environment.apiUrl;
  public currentUserSource = new ReplaySubject<IUser>(1);
  public currentUser$ = this.currentUserSource.asObservable();

  public constructor(private http: HttpClient, private readonly router: Router) {}

  public loadCurrentUser(token: string): Observable<void | null> {
    if (token === null) {
      this.currentUserSource.next(null);
      return of(null);
    }

    let headers = new HttpHeaders();
    headers = headers.set('Authorization', `Bearer ${token}`);

    return this.http.get(this.baseUrl + 'account', { headers }).pipe(
      map((user: IUser) => {
        if (user) {
          localStorage.setItem('token', user.token);

          this.currentUserSource.next(user);
        }
      }),
    );
  }

  public login(values: any): Observable<void> {
    return this.http.post(this.baseUrl + 'account/login', values).pipe(
      map((user: IUser) => {
        if (user) {
          localStorage.setItem('token', user.token);

          this.currentUserSource.next(user);
        }
      }),
    );
  }

  public register(values: any): Observable<void> {
    return this.http.post(this.baseUrl + 'account/register', values).pipe(
      map((user: IUser) => {
        if (user) {
          localStorage.setItem('token', user.token);

          this.currentUserSource.next(user);
        }
      }),
    );
  }

  public logout(): void {
    localStorage.removeItem('token');
    this.currentUserSource.next(null);

    this.router.navigateByUrl('/');
  }

  public checkEmailExists(email: string): Observable<boolean> {
    return this.http.get<boolean>(this.baseUrl + 'account/emailexists?email=' + email);
  }

  public getUserAddress(): Observable<IAddress> {
    return this.http.get<IAddress>(this.baseUrl + 'account/address');
  }

  public updateUserAddress(address: IAddress): Observable<IAddress> {
    return this.http.put<IAddress>(this.baseUrl + 'account/address', address);
  }
}
