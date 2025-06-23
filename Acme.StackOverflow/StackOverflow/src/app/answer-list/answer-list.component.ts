import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionAndanswerService } from '../services/questionAndanswerService/question-andanswer.service';

@Component({
  selector: 'app-answer-list',
  imports: [CommonModule],
  templateUrl: './answer-list.component.html',
  styleUrl: './answer-list.component.css'
})
export class AnswerListComponent {
  answers: any[] = [];
  postId!: string;

  constructor(
    private route: ActivatedRoute,
    private qaService: QuestionAndanswerService
  ) {}

  ngOnInit(): void {
    this.postId = this.route.snapshot.paramMap.get('id')!;
    this.loadAnswers();
  }

  loadAnswers(): void {
    this.qaService.getAnswerById(this.postId).subscribe((data: any) => {
      this.answers = data;
    });
  }

}
