import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { error } from 'console';
import { CategoryService } from 'src/app/services/category.service';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-quiz',
  templateUrl: './update-quiz.component.html',
  styleUrls: ['./update-quiz.component.css'],
})
export class UpdateQuizComponent implements OnInit {
  qId = 0;
  quiz: any = '';
  categories: any;

  constructor(
    private rout: ActivatedRoute,
    private _quiz: QuizService,
    private category: CategoryService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.qId = this.rout.snapshot.params['qId'];

    this._quiz.getQuiz(this.qId).subscribe(
      (data: any) => {
        this.quiz = data;
        console.log(this.quiz);
      },
      (error) => {
        console.log(error);
      }
    );

    this.category.categories().subscribe(
      (data: any) => {
        this.categories = data;
      },
      (error) => {
        Swal.fire('Error!', 'Error loading categories', 'error');
      }
    );
  }

  update() {
    if (this.qId == this.quiz.qId) {
      this._quiz.updateQuiz(this.quiz).subscribe(
        (data: any) => {
          Swal.fire('Success', 'Quiz updated successfully!', 'success').then(
            (e) => {
              this.router.navigate(['/admin/quizzes']);
            }
          );
        },
        (error) => {
          Swal.fire('Error', 'Error in updating quiz!', 'error');
        }
      );
    }
  }
}
