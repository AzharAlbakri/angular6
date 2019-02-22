import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../user.service';
import { User } from '../../../User';


@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent implements OnInit {
<<<<<<< HEAD
  name:string = localStorage.getItem('name')
  email:string = localStorage.getItem('email')
  constructor() { }

  ngOnInit() {
    
=======
  user: User;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.getUser();
  }

  getUser(): void {
    console.log();
    this.userService.getUser()
      .subscribe(user => this.user = user[0]);
>>>>>>> cdb89ea4a849509bd7b68a94d2193e10482deffd
  }

}
