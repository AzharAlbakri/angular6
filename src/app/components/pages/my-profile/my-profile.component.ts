import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../user.service';
import { User } from '../../../User';


@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent implements OnInit {
  name:string = localStorage.getItem('name')
  email:string = localStorage.getItem('email')
  constructor() { }

  ngOnInit() {
    
  }

}
