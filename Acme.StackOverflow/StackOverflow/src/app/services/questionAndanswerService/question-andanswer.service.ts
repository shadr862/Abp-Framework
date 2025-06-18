import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuestionAndanswerService {

  private refreshNeeded$ = new Subject<void>();


  constructor(private http: HttpClient) {}

  
  triggeredRefresh()
  {
    this.refreshNeeded$.next();
  }

  onRefresh(): Observable<void> {
    return this.refreshNeeded$.asObservable();
  }


  getTags()
  {
    return this.http.get<any>('https://localhost:44341/api/app/tag');
  }

  createPost(post: any) {

    return this.http.post("https://localhost:44341/api/app/post", post);
  }
  getQuestion()
  {
    return this.http.get<any>('https://localhost:44341/api/app/post/questions');
  }

  getQuestionById(id:any){
    return this.http.get<any>(`https://localhost:44341/api/app/post/${id}`)
  }

  delteQuestion(id:any)
  {
    return this.http.delete(`https://localhost:44341/api/app/post/${id}`)
  }

}
