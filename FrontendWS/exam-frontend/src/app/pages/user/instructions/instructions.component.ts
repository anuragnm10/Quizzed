import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { error } from 'console';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-instructions',
  templateUrl: './instructions.component.html',
  styleUrls: ['./instructions.component.css'],
})
export class InstructionsComponent implements OnInit {
  quiz: any;
  qid: any;

  constructor(
    private _route: ActivatedRoute,
    private _quiz: QuizService,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this.qid = this._route.snapshot.params['qId'];
    this._quiz.getQuiz(this.qid).subscribe(
      (data: any) => {
        this.quiz = data;
        console.log(this.quiz);
      },
      (error) => {
        Swal.fire('Error', 'Error loading this quid!', 'error');
      }
    );
  }

  startQuiz() {
    Swal.fire({
      title: 'Do you want to start the quiz?',
      showCancelButton: true,
      confirmButtonText: 'Start',
      icon: 'info',
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this._router.navigate(['/start/' + this.qid]);
      } else if (result.isDenied) {
        Swal.fire('Changes are not saved', '', 'info');
      }
    });
  }
}
