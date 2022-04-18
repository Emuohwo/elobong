import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'admin-categories-list',
  templateUrl: './categories-list.component.html',
  styles: [
  ]
})
export class CategoriesListComponent implements OnInit {

  categories = [
    {
      id: 1,
      name: 'category-1',
      icon: 'icon-1'
    },
    {
      id: 2,
      name: 'category-2',
      icon: 'icon-2'
    },
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
