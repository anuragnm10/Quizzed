import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import { QuizService } from 'src/app/services/quiz.service';

@Component({
  selector: 'app-load-quiz',
  templateUrl: './load-quiz.component.html',
  styleUrls: ['./load-quiz.component.css'],
})
export class LoadQuizComponent implements OnInit {
  quizzes: any;
  catid: any;

  constructor(private _route: ActivatedRoute, private quiz: QuizService) {}

  ngOnInit(): void {
    this._route.params.subscribe((params) => {
      this.catid = params['catId'];

      if (this.catid == 0) {
        this.quiz.getActiveQuizzes().subscribe(
          (data) => {
            this.quizzes = data;
            console.log(this.quizzes);
          },
          (error) => {
            alert('Error in loading all quizzes');
          }
        );
      } else {
        this.quiz.getActiveQuizzesByCategory(this.catid).subscribe(
          (data: any) => {
            this.quizzes = data;
          },
          (error) => {
            alert('Error in loading data!');
          }
        );
      }
    });
  }
}
