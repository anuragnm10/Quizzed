import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root',
})
export class QuizService {
  constructor(private http: HttpClient) {}

  public quizzes() {
    return this.http.get(`${baseUrl}/quiz/`);
  }

  // add quiz
  public addQuiz(quiz: any) {
    return this.http.post(`${baseUrl}/quiz/`, quiz);
  }

  // delete quiz

  public deleteQuiz(qId: any) {
    return this.http.delete(`${baseUrl}/quiz/${qId}`);
  }

  //get quiz by Id
  public getQuiz(qId: any) {
    return this.http.get(`${baseUrl}/quiz/${qId}`);
  }

  //update quiz
  public updateQuiz(quiz: any) {
    return this.http.put(`${baseUrl}/quiz/`, quiz);
  }

  //get quizzes by category
  public getQuizzesByCategory(cid: any) {
    return this.http.get(`${baseUrl}/quiz/category/${cid}`);
  }

  //get active quizzes
  public getActiveQuizzes() {
    return this.http.get(`${baseUrl}/quiz/active`);
  }

  //get active quizzes by category
  public getActiveQuizzesByCategory(cid: any) {
    return this.http.get(`${baseUrl}/quiz/category/active/${cid}`);
  }
}
