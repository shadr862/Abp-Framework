import { Routes } from '@angular/router';
import { TopNavComponent } from './top-nav/top-nav.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { PostQuestionComponent } from './post-question/post-question.component';
import { PostAnswerComponent } from './post-answer/post-answer.component';
import { AnswerListComponent } from './answer-list/answer-list.component';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { SearchQuestionComponent } from './search-question/search-question.component';



export const routes: Routes = [
  {
    path: 'dashboard',
    component: TopNavComponent,
    children: [
       {path:'create-question',component:PostQuestionComponent},
       {path:'questionList', loadChildren: () => import('./question-list/questions.route').then(m => m.questionRoute)},
       {path:'my-profile',component:MyProfileComponent},
       {path:'search',component:SearchQuestionComponent},
       {path:'create-answer/:id',component:PostAnswerComponent},
       {path:'answerList/:id',component:AnswerListComponent},
       {path:'',redirectTo:'questionList',pathMatch:'full'},
    ]
  },
  // Optional fallback route:
  { path: 'login', component:LoginComponent},
  { path: 'signup',component:SignupComponent},
  { path: '', redirectTo: 'dashboard',pathMatch:'full'},
  { path: '**', redirectTo: 'dashboard', pathMatch: 'full' }
];

