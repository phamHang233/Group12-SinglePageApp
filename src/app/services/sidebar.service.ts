// sidebar.service.ts

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SidebarService {
  private isSidebarVisibleSubject = new BehaviorSubject<boolean>(true);
  isSidebarVisible$ = this.isSidebarVisibleSubject.asObservable();

  hideSidebar() {
    this.isSidebarVisibleSubject.next(false);
  }

  showSidebar() {
    this.isSidebarVisibleSubject.next(true);
  }
}
