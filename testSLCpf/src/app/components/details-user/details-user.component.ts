import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-details-user',
  templateUrl: './details-user.component.html',
  styleUrls: ['./details-user.component.less']
})
export class DetailsUserComponent implements OnInit {

  userName: any;
  user: any;
  repositories: any = [];

  constructor(
    private service: UserService,
    private route: ActivatedRoute, 
    public router: Router) {
      
      this.user = false;
      
  }

  ngOnInit(): void {

      this.route.queryParams.subscribe((result: any) => {
          this.userName = result.userName;
      });

      this.service.getUser(this.userName).subscribe(user => {
          this.user = user;
          
          if(this.user.bio === null)
            this.user.bio = ' Este perfil não possui descrição de bio.';

          if(this.user.email === null)
            this.user.email = ' Este perfil não possui email cadastrado.';
      });

      this.service.getRepositories(this.userName).subscribe(repositories => {
        
        this.repositories = repositories;
        
        for(var i=0; i< this.repositories.length; i++) {
          if(this.repositories[i].description == null)
          this.repositories[i].description = ' Este repositório não possui descrição original.';
        }
        
    });

  }

  returnSearchUserPage() {
      this.router.navigate(['/search']);
  }

}
