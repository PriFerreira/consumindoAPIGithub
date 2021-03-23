import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-search-user',
  templateUrl: './search-user.component.html',
  styleUrls: ['./search-user.component.less']
})
export class SearchUserComponent implements OnInit{

  userName: string;
  users: any;

  constructor(
    private service: UserService, 
    public router: Router) { }

    ngOnInit(): void {
      this.service.getUsers().subscribe((users: User[]) => {
        this.users = users;
      });
    }

  searchUser() {
      this.service.getUser(this.userName);
      this.router.navigate(
        ['/details'], 
        {
          queryParams: {userName: this.userName}
        }
      );
  }

}
