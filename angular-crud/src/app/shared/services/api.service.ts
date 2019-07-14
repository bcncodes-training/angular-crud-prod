import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {tap, catchError} from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Member } from '../classes/member';
import { environment } from '../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiURL = `${environment.API_URL}clientes`;
  constructor(private http: HttpClient) { }

  getMembers$() {
    return this.http.get(this.apiURL);
  }

  getMember$(id: string) {
    this.apiURL +=id;
    return this.http.get<Member>(this.apiURL);
  }

  addMember$(member:Member) {
    return this.http.post<Member>(this.apiURL, member)
      .pipe(tap((member: Member) => console.log(`added member: id=${member.id}`)),
            catchError(error => {console.log(error);
                                 return throwError(error); }));
  }

  deleteMember$(id: string) {
    this.apiURL +=id;
    return this.http.delete(this.apiURL);
  }

  editMember$(member:Member) {
    return this.http.put<Member>(this.apiURL, member)
      .pipe(tap((member: Member) => console.log(`edited member: id=${member.id}`)),
            catchError(error => {console.log(error);
                                 return throwError(error); }));
  }
}
