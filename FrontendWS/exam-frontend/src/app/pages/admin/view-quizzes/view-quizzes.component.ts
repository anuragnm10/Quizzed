import { Component, OnInit } from '@angular/core';
import { error } from 'console';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-quizzes',
  templateUrl: './view-quizzes.component.html',
  styleUrls: ['./view-quizzes.component.css'],
})
export class ViewQuizzesComponent implements OnInit {
  quizzes = [
    {
      qId: '',
      title: '',
      description: '',
      maxMarks: '',
      noOfQuestions: '',
      active: '',
      category: {
        title: '',
      },
    },
  ];

  constructor(private quiz: QuizService) {}

  ngOnInit(): void {
    this.quiz.quizzes().subscribe(
      (data: any) => {
        this.quizzes = data;
        console.log(this.quizzes);
      },
      (error) => {
        console.log(error);
        Swal.fire('Error!!', 'Error in loading data!', 'error');
      }
    );
  }

  deleteQuiz(qId: any) {
    Swal.fire({
      icon: 'info',
      title: 'Are you sure, you want to delete this quiz?',
      confirmButtonText: 'Delete',
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        this.quiz.deleteQuiz(qId).subscribe(
          (data) => {
            this.quizzes = this.quizzes.filter((quiz) => quiz.qId != qId);
            Swal.fire('Success', 'Quiz Deleted', 'success');
          },
          (error) => {
            Swal.fire('Error', 'Error in deleting quiz', 'error');
          }
        );
      }
    });
  }
}
