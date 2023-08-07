import { Component, Input } from '@angular/core';
import { Coctail } from '../models/coctail';

@Component({
  selector: 'app-coctail',
  templateUrl: './coctail.component.html',
  styleUrls: ['./coctail.component.css']
})
export class CoctailComponent {
  @Input('coctail') coctail: Coctail | null = null

}
