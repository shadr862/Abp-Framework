import { Component } from "@angular/core";
import { QuestionListComponent } from "./question-list.component";
import { Routes } from "@angular/router";
import { DetailQuestionComponent } from "../detail-question/detail-question.component";


export const questionRoute: Routes = [
    {path:'', component: QuestionListComponent},
    {path:'details/:id',component:DetailQuestionComponent},
]