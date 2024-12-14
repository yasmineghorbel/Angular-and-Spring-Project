import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "src/Services/AuthService";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
})
export class RegisterComponent implements OnInit {
  constructor(private authService:AuthService, private router:Router){}
  signIn():void{
    this.authService.doGoogleLogin().then(()=>{this.router.navigate(['/member'])})
  }
  ngOnInit(): void {}
}
