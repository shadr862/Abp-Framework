import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth-service/auth.service';
import { FormsModule } from '@angular/forms';
import { UserfilterPipe } from "../custom-pipe/userfilter.pipe";

@Component({
  selector: 'app-user-list',
  imports: [CommonModule, FormsModule, UserfilterPipe],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent implements OnInit {
  users: any;
  searchText:string='';

  constructor(private AuthService: AuthService) { }


  ngOnInit() {
    
    this.AuthService.RefreshOn().subscribe(()=>{
      this.loadData();
    })

    this.loadData();
  }

  loadData()
  {
    this.AuthService.getRegisteredUsers().subscribe((data: any) => {
      this.users = data;
    });
  }

  deleteUser(userId: any) {
    this.AuthService.deleteRegisteredUser(userId).subscribe(()=>{
      this.AuthService.TriggerRefresh();
      if(this.AuthService.userId==userId)
      {
        this.AuthService.clearUser();
      }
    })
  }


}
