import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { BaseRepository } from '../../services/base.repository';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [RouterModule, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  isLoggedIn: boolean = false;
  isClass: boolean = true;
  constructor(private _baseRepository: BaseRepository, private router: Router) {
    // this.isLoggedIn = this._baseRepository.isLoggedIn();
  }

  ngOnInit() {

  }

  checkToken(): boolean {
    return this._baseRepository.isLoggedIn();

  }

  logout() {
    this.isLoggedIn = false;
    this._baseRepository.logout();
    this.router.navigate(['/login']);
  }
  toggle() {
    this.isClass ? this.isClass = false : this.isClass=true

  }


}
