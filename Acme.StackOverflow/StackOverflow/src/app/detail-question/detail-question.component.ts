import { Component, OnInit } from '@angular/core';
import { QuestionAndanswerService } from '../services/questionAndanswerService/question-andanswer.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-detail-question',
  imports: [CommonModule],
  templateUrl: './detail-question.component.html',
  styleUrl: './detail-question.component.css'
})
export class DetailQuestionComponent implements OnInit {

  questionId!:string;
  question:any;

  constructor(private Service:QuestionAndanswerService,
    private router:ActivatedRoute){}
  

  ngOnInit(): void {
    this.questionId = this.router.snapshot.paramMap.get('id')?? '';
    this.Service.getQuestionById(this.questionId).subscribe((data)=>{
      this.question=data;
    })
  }  


}
