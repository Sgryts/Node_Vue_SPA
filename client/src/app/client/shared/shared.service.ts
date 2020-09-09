import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

/**
 * Solves an issue with the burger menu
 * coloring. Comment will stay here untill 
 * another approach is found
 */
@Injectable()
export class SharedStylingService {
    public isDarkColorSubject = new BehaviorSubject<boolean>(false);
    public isDarkColor$ = this.isDarkColorSubject.asObservable();

    constructor() {
    }
}