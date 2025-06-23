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
    return this.http.get<any>('https://localhost:44341/api/app/post');
  }

  getQuestionById(id:any){
    return this.http.get<any>(`https://localhost:44341/api/app/post/${id}`)
  }

  getQuestionByUserId(id:any){
    return this.http.get<any>(`https://localhost:44341/api/app/post/posts-by-user-id/${id}`)
  }

  delteQuestion(id:any)
  {
    return this.http.delete(`https://localhost:44341/api/app/post/${id}`)
  }


  postAnswer(answer:any)
  {
    return this.http.post<any>("https://localhost:44341/api/app/answer",answer)
  }

  getAnswerById(id:any){
    return this.http.get<any>(`https://localhost:44341/api/app/answer/answers-by-post-id/${id}`)
  }

}
