import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'ui-gallery',
  templateUrl: './gallery.component.html',
  styles: [
  ]
})
export class GalleryComponent implements OnInit {
  @Input() images?: string[]

  selectedImageUrl?: string = ''
  
  // constructor() { }

  ngOnInit(): void {
    // this.selectedImageUrl = this.images?.[0]
    if (this.images?.length) {      
    this.selectedImageUrl = this.images?.[0]
    }
  }

  changeSelectedImageUrl(imageUrl: string) {
    this.selectedImageUrl = imageUrl
  }

  get hasImages() {
    return this.images?.length !== undefined 
  }

}
