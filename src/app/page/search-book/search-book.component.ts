import { Route } from '@angular/compiler/src/core';
import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CoreService } from 'src/app/services/core.service';

@Component({
  selector: 'app-search-book',
  templateUrl: './search-book.component.html',
  styleUrls: ['./search-book.component.scss']
})
export class SearchBookComponent implements OnInit {

  constructor(
    public coreSvc: CoreService,
    public router: Router
  ) { }

  public categoryWiseDetails = [];
  public onPageScrollData: any;
  public selectedCategory: string = '';
  public searchBookText: string = '';
  public displayCloseBtn: boolean = false;

  ngOnInit(): void {
    this.selectedCategory = this.coreSvc.getCategory();
    this.coreSvc.getBookDetails().subscribe(res => {
      if (res) {
        this.onPageScrollData = res;
        const bookData = res['results'];
        this.displayBookInPage(bookData);
      }
    })
  }

  onScrollNext() {
    if (this.onPageScrollData && this.onPageScrollData['next'])
      this.coreSvc.onScrollNextURL(this.onPageScrollData['next']).subscribe(res => {
        this.onPageScrollData = JSON.parse(JSON.stringify(res));
        const bookData = res['results'];
        const nextScrollData = this.coreSvc.findDataFromArray(bookData, this.selectedCategory);
        this.categoryWiseDetails = this.categoryWiseDetails.concat(nextScrollData);
      });
  }

  redirectToMenu() {
    this.router.navigateByUrl('/menu');
  }

  redirectToBook(bookDetail) {
    const formatDetails = [];
    for (const key in bookDetail.formats) {
      if (Object.prototype.hasOwnProperty.call(bookDetail.formats, key)) {
        const element = bookDetail.formats[key];
        var ext = /^.+\.([^.]+)$/.exec(element);
        if (ext[1] == 'html' ||ext[1] == 'htm' || ext[1] == 'pdf' || ext[1] == 'txt') {
          formatDetails.push({ url: element, type: ext[1] });
        }
      }
    }

    if (formatDetails.length > 0) {
      let flag = true;
      const formatTypes = ['html' ,'htm', 'pdf', 'txt'];
      formatTypes.forEach(element => {
        const typeCheckUrl = formatDetails.filter(id => id.type === element);
        if (typeCheckUrl.length > 0 && flag) {
          window.open(typeCheckUrl[0].url);
          flag =  false;
        }
      });
    } else {
      alert('No viewable version available.');
    }
  
  }

  // Define the search text and pass to search api 

  searchBookByText() {
    this.displayCloseBtn = true;
    if (this.searchBookText !== '') {
      const searchText = JSON.parse(JSON.stringify(this.searchBookText.replace(' ', '%20')));
      this.coreSvc.getBookBySearch(searchText).subscribe(res => {
        const bookData = res['results'];
        this.displayBookInPage(bookData);
      })
    }
  }

  // this method is use to display the book details in page.

  displayBookInPage(bookData) {
    this.categoryWiseDetails = this.coreSvc.findDataFromArray(bookData, this.selectedCategory);
  }

  // use the hostlistener for find the scroll event  
  @HostListener('window:scroll', [])
  onWindowScroll() {
    let scorllPosition = (document.documentElement.scrollTop || document.body.scrollTop) + document.documentElement.offsetHeight;
    let maxHeight = document.documentElement.scrollHeight;
    console.log(scorllPosition,maxHeight)
    if (scorllPosition == maxHeight && this.categoryWiseDetails.length > 0) {
      this.onScrollNext();
    }
  }
}

