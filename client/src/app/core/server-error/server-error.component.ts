import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-server-error',
  templateUrl: './server-error.component.html',
  styleUrls: ['./server-error.component.scss'],
})
export class ServerErrorComponent {
  public error: any;

  public constructor(private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    this.error = navigation && navigation?.extras?.state?.error;
  }
}
