import { LocationStrategy } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { title } from 'process';
import { QuestionsService } from 'src/app/services/questions.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css'],
})
export class StartComponent implements OnInit {
  questions: any;
  qid: any;

  totalMarks: any = 0;
  marksObtained: any = 0;
  correctAns: any = 0;
  attemptedQuestions: any = 0;
  isSubmit: any = false;

  timer: any;

  constructor(
    private locationST: LocationStrategy,
    private _route: ActivatedRoute,
    private _question: QuestionsService
  ) {}

  ngOnInit(): void {
    this.preventBackButton();
    this.qid = this._route.snapshot.params['qId'];
    console.log(this.qid);
    this.loadQuestions();
  }

  loadQuestions() {
    this._question.getQuestionsOfQuizForExam(this.qid).subscribe(
      (data: any) => {
        this.questions = data;
        this.timer = this.questions.length * 2 * 60;

        this.totalMarks = this.questions[0].quiz.maxMarks;

        console.log(this.questions);
        this.startTimer();
      },
      (error) => {
        console.log(error);
        Swal.fire('Error', 'Error in loading questions!', 'error');
      }
    );
  }

  preventBackButton() {
    history.pushState(null, '', location.href);
    this.locationST.onPopState(() => {
      history.pushState(null, '', location.href);
    });
  }

  submitQuiz() {
    Swal.fire({
      title: 'Do you want submit the quiz?',
      showCancelButton: true,
      confirmButtonText: 'Submit',
      icon: 'info',
    }).then((e) => {
      if (e.isConfirmed) {
        this.evaluateQuiz();
      }
    });
  }

  startTimer() {
    let t = window.setInterval(() => {
      if (this.timer <= 0) {
        this.evaluateQuiz();
        clearInterval(t);
      } else {
        this.timer--;
      }
    }, 1000);
  }

  formatTime() {
    let mm = Math.floor(this.timer / 60);
    let ss = this.timer - mm * 60;
    return `${mm} min : ${ss} sec`;
  }

  evaluateQuiz() {
    // this.isSubmit = true;
    // this.questions.forEach((q: any) => {
    //   if (q.givenAnswer == q.answer) {
    //     this.attemptedQuestions++;
    //     this.correctAns++;
    //     let marksPerQuestion =
    //       this.questions[0].quiz.maxMarks / this.questions.length;
    //     this.marksObtained += marksPerQuestion;
    //   } else {
    //     if (q.givenAnswer.trim() != '') {
    //       this.attemptedQuestions++;
    //     }
    //   }
    // });
    // console.log('Marks Obtained : ' + this.marksObtained);
    // console.log('Attempted :' + this.attemptedQuestions);
    // console.log('Correct Ans : ' + this.correctAns);

    //sending request to server to evaluate quiz
    this._question.evaluateQuiz(this.questions).subscribe(
      (data: any) => {
        this.marksObtained = data.marksObtained;
        this.correctAns = data.correctAnswers;
        this.attemptedQuestions = data.attemptedQuestions;
        this.isSubmit = true;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  printPage() {
    window.print();
  }
}
