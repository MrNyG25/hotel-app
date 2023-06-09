import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  constructor(
  ) { }

  getUUID(): string{
   return uuidv4();
  }

  getDataLocalStorage(localStorageKey: string){
    return localStorage.getItem(localStorageKey);
  }

  refreshLocalStorage(localStorageKey: string, data: any[]){
    localStorage.setItem(localStorageKey, JSON.stringify([...data]));
  }

  getData(localStorageKey: string, data: any[]): any[] {
    const savedData = this.getDataLocalStorage(localStorageKey);

    if(!savedData) {
      this.refreshLocalStorage(localStorageKey, data)
      const savedData = this.getDataLocalStorage(localStorageKey);
      return JSON.parse(savedData!);
    }
    return JSON.parse(savedData!);
  }


  /**
   * This function checks if a given form field is invalid based on its validation rule and its current
   * state.
   * @param {AbstractControl} field - AbstractControl is a class in Angular that represents a form
   * control, such as an input field or a select dropdown. It contains properties and methods for
   * managing the state and validation of the control.
   * @param {string | null} [validationRule=null] - The `validationRule` parameter is an optional
   * string parameter that specifies the specific validation rule to check for. If it is provided, the
   * function will check if the field has an error for that specific validation rule. If it is not
   * provided, the function will check if the field is invalid in general (
   * @returns The function `isFieldInvalid` returns a boolean value indicating whether a given form
   * field is invalid based on its validation status and whether it has been touched or modified by the
   * user. If a validation rule is provided, it checks if the field has an error for that specific
   * rule.
   */
  isFieldInvalid(field: AbstractControl | null, validationRule: string | null = null): boolean  {
    if(field){
      if(validationRule){
        return field.errors?.[validationRule] && !field?.valid && (field?.dirty || field?.touched);
      }
      return !field?.valid && (field?.dirty || field?.touched);
    }
    return false;
  }

  getMergedInfo():void {
    //let hotels = this.getData(this.hotel, this.hotelsService.hotels);
  }

}
