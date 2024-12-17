import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service'; 

@Injectable({
  providedIn: 'root',
})
export class APIControllerService {
  apiURL = 'http://localhost:3000';

  constructor(private http: HttpClient, private authService: AuthService) {}

  private async isAuthenticated(): Promise<boolean> {
    return await this.authService.isAuthenticated(); 
  }

  async getUsers(): Promise<Observable<any>> {
    const isLoggedIn = await this.isAuthenticated();
    if (isLoggedIn) {
      return this.http.get(this.apiURL + '/users');
    } else {
      console.error('Error: No está autenticado');
      throw new Error('No está autenticado');
    }
  }

  async postUser(data: any): Promise<Observable<any>> {
    const isLoggedIn = await this.isAuthenticated();
    if (isLoggedIn) {
      return this.http.post(this.apiURL + '/users', data);
    } else {
      console.error('Error: No está autenticado');
      throw new Error('No está autenticado');
    }
  }

  async updateUser(id: string, data: any): Promise<Observable<any>> {
    const isLoggedIn = await this.isAuthenticated();
    if (isLoggedIn) {
      return this.http.put(this.apiURL + '/users/' + id, data);
    } else {
      console.error('Error: No está autenticado');
      throw new Error('No está autenticado');
    }
  }

  async deleteUser(id: string): Promise<Observable<any>> {
    const isLoggedIn = await this.isAuthenticated();
    if (isLoggedIn) {
      return this.http.delete(this.apiURL + '/users/' + id);
    } else {
      console.error('Error: No está autenticado');
      throw new Error('No está autenticado');
    }
  }
}
