import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root',
})
export class QuestionsService {
  constructor(private http: HttpClient) {}

  //admin use
  public getQuestionsOfQuiz(qId: any) {
    return this.http.get(`${baseUrl}/question/quiz/all/${qId}`);
  }

  public getQuestionsOfQuizForExam(qId: any) {
    return this.http.get(`${baseUrl}/question/quiz/${qId}`);
  }

  //add question
  public addQuestion(question: any) {
    return this.http.post(`${baseUrl}/question/`, question);
  }

  public deleteQuestion(quesId: any) {
    return this.http.delete(`${baseUrl}/question/${quesId}`);
  }

  //evaluate quiz
  public evaluateQuiz(questions: any) {
    return this.http.post(`${baseUrl}/question/evaluate-quiz`, questions);
  }
}
