import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { error } from 'console';
import { CategoryService } from 'src/app/services/category.service';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-quiz',
  templateUrl: './add-quiz.component.html',
  styleUrls: ['./add-quiz.component.css'],
})
export class AddQuizComponent implements OnInit {
  categories = [
    {
      cid: '',
      title: '',
    },
  ];

  quizData = {
    title: '',
    description: '',
    maxMarks: '',
    noOfQuestions: '',
    active: '',
    category: {
      cid: '',
    },
  };

  constructor(
    private category: CategoryService,
    private snack: MatSnackBar,
    private quiz: QuizService
  ) {}

  ngOnInit(): void {
    this.category.categories().subscribe(
      (data: any) => {
        this.categories = data;
        console.log(this.categories);
      },
      (error) => {
        console.log(error);
        Swal.fire('Error!', 'Error in loading data', 'error');
      }
    );
  }

  addQuiz() {
    if (this.quizData.title.trim() == '' || this.quizData.title == null) {
      this.snack.open('Title required !!', '', {
        duration: 3000,
      });
      return;
    }

    this.quiz.addQuiz(this.quizData).subscribe(
      (data: any) => {
        Swal.fire('Success', 'Quiz added successfully!', 'success');
        this.quizData = {
          title: '',
          description: '',
          maxMarks: '',
          noOfQuestions: '',
          active: 'false',
          category: {
            cid: '',
          },
        };
      },
      (error: any) => {
        Swal.fire('Error', 'Error adding data', 'error');
      }
    );
  }
}
