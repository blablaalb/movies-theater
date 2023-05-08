import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { toBase64 } from '../utils';

@Component({
  selector: 'app-input-img',
  templateUrl: './input-img.component.html',
  styleUrls: ['./input-img.component.css']
})
export class InputImgComponent implements OnInit {
  imageBase64!: string;
  @Output()
  onImageSelected = new EventEmitter<File>();
  @Input()
  urlCurrentImage?: string;

  constructor() { }

  ngOnInit(): void {
  }

  change(event: Event): void {
    const target = event.target as HTMLInputElement;
    if (target && target.files && target.files?.length > 0) {
      const file: File = target.files[0];
      toBase64(file).then((value: string) => this.imageBase64 = value);
      this.onImageSelected?.emit(file);
      this.urlCurrentImage = '';
    }
  }
}
