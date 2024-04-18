import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { error } from 'console';
import { QuestionsService } from 'src/app/services/questions.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-quiz-questions',
  templateUrl: './view-quiz-questions.component.html',
  styleUrls: ['./view-quiz-questions.component.css'],
})
export class ViewQuizQuestionsComponent implements OnInit {
  qId: any = '';
  qTitle: any = '';
  questions: any = [];

  constructor(
    private route: ActivatedRoute,
    private _questions: QuestionsService,
    private snack: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.qId = this.route.snapshot.params['qId'];
    this.qTitle = this.route.snapshot.params['title'];

    this._questions.getQuestionsOfQuiz(this.qId).subscribe(
      (data: any) => {
        console.log(data);
        this.questions = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  deleteQuestion(qId: any) {
    Swal.fire({
      icon: 'info',
      showCancelButton: true,
      confirmButtonText: 'Delete',
      title: 'Are you sure, you want to delete this question?',
    }).then((result) => {
      if (result.isConfirmed) {
        this._questions.deleteQuestion(qId).subscribe(
          (data) => {
            this.snack.open('Question Deleted', '', {
              duration: 3000,
            });
            this.questions = this.questions.filter((q: any) => q.quesId != qId);
          },
          (error) => {
            Swal.fire('Error', 'Error deleting question', 'error');
          }
        );
      }
    });
  }
}
