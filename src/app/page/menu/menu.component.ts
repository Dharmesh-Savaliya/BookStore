import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CoreService } from 'src/app/services/core.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  projectTitle = 'Book Store';
  public category = [];

  constructor(
    public router: Router,
    public coreSvc: CoreService
  ) {}

  ngOnInit(): void {
    this.category = [
      {
        name: 'Fiction', icon:"fa fa-flask" 
      },
      { name: 'Drama', icon: "fa fa-user-secret"  },
      { name: 'Humor', icon:"fa fa-smile-o"  },
      { name: 'Polotics', icon:"fa fa-users"  },
      { name: 'Philosophy', icon:"fa fa-steam-square"  },
      { name: 'History', icon:"fa fa-history"  },
      { name: 'Adventure', icon:"fa fa-optin-monster"  }
    ];
  }

  redirectToCategory(data) {
    this.coreSvc.setCategory(data);
    this.router.navigateByUrl('/bookDetails');
  }

  redirectToMenu() {
    this.router.navigateByUrl('/menu');
  }

}
