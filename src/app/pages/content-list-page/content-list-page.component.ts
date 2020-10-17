import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import _ from 'lodash';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-content-list-page',
  templateUrl: './content-list-page.component.html',
  styleUrls: ['./content-list-page.component.scss']
})
export class ContentListPageComponent implements OnInit {

  @ViewChild('deleteMediaDialog') deleteMediaDialog: TemplateRef<any>;
  constructor(private dialog: MatDialog,
              private snackBar: MatSnackBar) {
  }

  typesOfMedia = [
    {name: 'Tümü', slug: 'all'},
    {name: 'Filmler', slug: 'movies'},
    {name: 'Diziler', slug: 'series'}
  ];
  selectedMediaType = 'all';
  typesOfOrder: any = [
    {name: 'Puana Göre (Azalan)', slug: 'byDescScore', attribute: 'score', direction: 'desc'},
    {name: 'Puana Göre (Artan)', slug: 'byAscScore', attribute: 'score', direction: 'asc'}
  ];
  selectedOrderType = 'byDescScore';
  mediaArray = [];
  filteredMediaArray = [];
  page = 1;
  pageSize = 10;
  mediaForDeletion: any = {};

  ngOnInit(): void {
    this.getMediaList();
  }
  setSelectedMediaType(item): void {
    this.selectedMediaType = item.option._value;
    this.filterMedia();
  }
  setSelectedOrderType(item): void {
    this.selectedOrderType = item.option._value;
    this.sortMedia();
  }
  getMediaList(): any {
    // Normally, we would have backend connection here with GET method to get the media list obviously
    // I will use my awesome handwritten array here :D
    this.mediaArray = [
      {id: 1, name: 'Film 1', year: 1980, score: 5, group: 'movies'},
      {id: 2, name: 'Film 2', year: 1981, score: 6, group: 'movies'},
      {id: 3, name: 'Film 3', year: 1982, score: 7, group: 'movies'},
      {id: 4, name: 'Film 4', year: 1983, score: 8, group: 'movies'},
      {id: 5, name: 'Film 5', year: 1984, score: 9, group: 'movies'},
      {id: 6, name: 'Film 6', year: 1985, score: 8, group: 'movies'},
      {id: 7, name: 'Film 7', year: 1986, score: 7, group: 'movies'},
      {id: 8, name: 'Film 8', year: 1987, score: 6, group: 'movies'},
      {id: 9, name: 'Film 9', year: 1988, score: 5, group: 'movies'},
      {id: 10, name: 'Film 10', year: 1989, score: 4, group: 'movies'},
      {id: 11, name: 'Film 11', year: 1970, score: 5, group: 'movies'},
      {id: 12, name: 'Film 12', year: 1971, score: 6, group: 'movies'},
      {id: 13, name: 'Film 13', year: 1972, score: 7, group: 'movies'},
      {id: 14, name: 'Film 14', year: 1973, score: 8, group: 'movies'},
      {id: 15, name: 'Film 15', year: 1974, score: 9, group: 'movies'},
      {id: 16, name: 'Series 1', year: 1975, score: 8, group: 'series'},
      {id: 17, name: 'Series 2', year: 1976, score: 7, group: 'series'},
      {id: 18, name: 'Series 3', year: 1977, score: 6, group: 'series'},
      {id: 19, name: 'Series 4', year: 1978, score: 5, group: 'series'},
      {id: 20, name: 'Series 5', year: 1979, score: 4, group: 'series'},
      {id: 21, name: 'Series 6', year: 1980, score: 5, group: 'series'},
      {id: 22, name: 'Series 7', year: 1990, score: 6, group: 'series'},
      {id: 23, name: 'Series 8', year: 1991, score: 7, group: 'series'},
      {id: 24, name: 'Series 9', year: 1982, score: 8, group: 'series'},
      {id: 25, name: 'Series 10', year: 1983, score: 9, group: 'series'}
    ];
    this.filterMedia();
  }
  getTotalPageNumbers(): any {
    let numbers = [];
    const pageCount = Math.ceil(this.filteredMediaArray.length / 10);
    numbers = Array(pageCount).fill(0).map((x, i) => i + 1);
    return numbers;
  }
  prevPage(): void {
    if (this.page > 1){
      this.page = this.page - 1;
    }
  }
  nextPage(): void {
    const totalPages = this.getTotalPageNumbers();
    if (this.page < totalPages[totalPages.length - 1]){
      this.page = this.page + 1;
    }
  }
  filterMedia(): void {
    this.filteredMediaArray = [];
    for (const mediaItem of this.mediaArray) {
      if (mediaItem.group === this.selectedMediaType || this.selectedMediaType === 'all'){
        this.filteredMediaArray.push(mediaItem);
      }
    }
    this.sortMedia();
  }
  sortMedia(): void {
    let orderAttr = '';
    let orderDirection = '';
    for (const orderType of this.typesOfOrder){
      if (orderType.slug === this.selectedOrderType){
        orderAttr = orderType.attribute;
        orderDirection = orderType.direction;
      }
    }
    let mediaArrayToBeSorted = this.filteredMediaArray;
    mediaArrayToBeSorted = _.orderBy(mediaArrayToBeSorted, [orderAttr], [orderDirection]); // Use Lodash to sort array by 'name'
    this.filteredMediaArray = mediaArrayToBeSorted;
  }
  openDeleteDialog(media): void {
    this.mediaForDeletion = media;
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.width = '500px';
    dialogConfig.minHeight = '250px';
    this.dialog.open(this.deleteMediaDialog, dialogConfig);
  }
  deleteMedia(): void {
    this.openSnackBar(this.mediaForDeletion.name + ' silindi! But not really, cause I am not connected to any backend and I do not want to use splice, seems cheap.');
    this.dialog.closeAll();
  }
  openSnackBar(message): void {
    this.snackBar.open(message, '', {
      duration: 2500,
      horizontalPosition: 'end',
      verticalPosition: 'top',
    });
  }
  addScore(item): void {
    if (item.score < 10) {
      item.score ++;
      this.sortMedia();
      this.openSnackBar(item.name + ' puanı yükseldi! But not really, cause I am not connected to any backend. So I just change array value.');
    }
  }
  decreaseScore(item): void {
    if (item.score > 1) {
      item.score --;
      this.sortMedia();
      this.openSnackBar(item.name + ' puanı azaldı! But not really, cause I am not connected to any backend. So I just change array value.');
    }
  }
}
