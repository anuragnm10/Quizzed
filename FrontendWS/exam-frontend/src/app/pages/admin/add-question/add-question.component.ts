import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionsService } from 'src/app/services/questions.service';
import Swal from 'sweetalert2';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.css'],
})
export class AddQuestionComponent implements OnInit {
  public Editor: any = ClassicEditor;
  question: any = {
    quiz: {},
    content: '',
    option1: '',
    option2: '',
    option3: '',
    option4: '',
    answer: '',
  };
  qId: any = '';
  title: any = '';

  constructor(
    private _route: ActivatedRoute,
    private _question: QuestionsService
  ) {}

  ngOnInit(): void {
    this.qId = this._route.snapshot.params['qId'];
    this.title = this._route.snapshot.params['title'];
    this.question.quiz['qId'] = this.qId;
  }

  formSubmit() {
    if (this.question.content.trim() == '' || this.question.content == null) {
      return;
    }

    this._question.addQuestion(this.question).subscribe(
      (data: any) => {
        Swal.fire('Success!', 'Question added successfully.', 'success');

        this.question.content = '';
        this.question.option1 = '';
        this.question.option2 = '';
        this.question.option3 = '';
        this.question.option4 = '';
        this.question.answer = '';
      },
      (error) => {
        Swal.fire('Error!', 'Error adding question!', 'error');
      }
    );
  }
}
