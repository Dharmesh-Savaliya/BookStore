import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CoreService {
  
  public configUrl: string = '';
  public selectedCategory: string = '';
  constructor(
    public http: HttpClient
  ) {
    this.configUrl = 'http://skunkworks.ignitesol.com:8000/books'
  }


  getBookDetails() {
    return this.http.get(this.configUrl);
  }

  onScrollNextURL(url) {
    return this.http.get(url);
  }

  setCategory(data) {
    this.selectedCategory = data;
  }

  getCategory() {
    return this.selectedCategory;
  }

  getBookBySearch(text) {
    return this.http.get(this.configUrl + '?search='+text);
  }

  findDataFromArray(bookData, key) {
    const categoryWiseDetails = [];
    bookData.forEach(element => {
      const singleEle = element.subjects.toString().toUpperCase();
      if (singleEle.includes(key.toUpperCase())) {
        categoryWiseDetails.push(element);
      }
    });
    return categoryWiseDetails;
  }
}
