import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root' // Ensures it's available globally
})
export class BaseRepository {
  private baseUrl = 'https://dummyjson.com';
 

  constructor(private http: HttpClient, private router: Router, private jwtHelper: JwtHelperService) {}




  saveToken(token: string) {
    localStorage.setItem('access_token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('access_token');
  }

  isLoggedIn(): boolean {
    const token = this.getToken();
    return token ? !this.jwtHelper.isTokenExpired(token) : false;
  }

  logout() {
    localStorage.removeItem('access_token');
    this.router.navigate(['/login']);
  }



  request<T>(endpoint: string, method: 'GET' | 'POST' | 'PUT' | 'DELETE', body?: any, params?: any): Observable<T> {
    const url = `${this.baseUrl}/${endpoint}`;

    let httpParams = new HttpParams();
    if (params) {
      Object.keys(params).forEach(key => {
        httpParams = httpParams.set(key, params[key]);
      });
    }

    let request$: Observable<T>;
    switch (method) {
      case 'GET':
        request$ = this.http.get<T>(url, { params: httpParams });
        break;
      case 'POST':
        request$ = this.http.post<T>(url, body);
        break;
      case 'PUT':
        request$ = this.http.put<T>(url, body);
        break;
      case 'DELETE':
        request$ = this.http.delete<T>(url);
        break;
      default:
        throw new Error('Invalid HTTP method');
    }

    return request$.pipe(catchError(this.handleError));
  }

  private handleError(error: any): Observable<never> {
    console.error('API Error:', error);
    return throwError(() => new Error('Something went wrong with the API.'));
  }
}
