import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PostType, TagDto } from './post-question.model';
import { QuestionAndanswerService } from '../services/questionAndanswerService/question-andanswer.service';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/authService/auth.service';

@Component({
  selector: 'app-post-question',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './post-question.component.html',
  styleUrls: ['./post-question.component.css']
})
export class PostQuestionComponent implements OnInit {
  postForm!: FormGroup;
  postTypes = PostType;
  tags: TagDto[] = [];

  // Group tags by their description (category)
  groupedTags: { [category: string]: TagDto[] } = {};

  constructor(private fb: FormBuilder, private service: QuestionAndanswerService
    ,private AuthService:AuthService) {}

  ngOnInit(): void {
  // Initialize the form
  this.postForm = this.fb.group({
    appUserId: [{ value: '', disabled: true }, Validators.required],
    postType: [PostType.Question, Validators.required],
    name:[''],
    parentId: [''],  
    acceptedAnswerId: [''],
    title: [''],
    body: ['', Validators.required],
    created:[''],
    tagIds: [[]]
  });

  // Set values from AuthService (adjust property names as per your auth service)
  const currentUserId = this.AuthService.userId;  // example method to get user id
  this.postForm.patchValue({
    appUserId: currentUserId,
    name:this.AuthService.userName,
    created: new Date().toISOString()


  });

  // Load tags and group as before...
  this.service.getTags().subscribe((res: any) => {
    this.tags = res.items.map((tag: TagDto) => ({
      ...tag,
      selected: false
    }));

    this.groupedTags = this.tags.reduce((acc, tag) => {
      const category = tag.tagDescription ?? 'Others';
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(tag);
      return acc;
    }, {} as { [category: string]: TagDto[] });
  });
}


  onTagChange(tag: TagDto): void {
    tag.selected = !tag.selected;
    const selectedTagIds = this.tags
      .filter(t => t.selected)
      .map(t => t.id);
    this.postForm.patchValue({ tagIds: selectedTagIds });
  }

  onSubmit() {
   
    if (this.postForm.valid) {
      this.service.createPost(this.postForm.getRawValue()).subscribe({
        next: () => alert('Post created successfully!'),
        error: err => console.error('Error:', err)
      });
    }
  }
}
