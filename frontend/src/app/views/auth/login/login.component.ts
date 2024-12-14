import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "src/Services/AuthService";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
})
export class LoginComponent implements OnInit {
  constructor(private authService:AuthService, private router:Router){}
  signInWithGoogle():void{
    this.authService.doGoogleLogin().then(()=>{this.router.navigate(['/'])})
  }
  ngOnInit(): void {}
}
