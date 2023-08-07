import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-coctail-details',
  templateUrl: './coctail-details.component.html',
  styleUrls: ['./coctail-details.component.css']
})
export class CoctailDetailsComponent implements OnInit{
  constructor (private readonly route: ActivatedRoute) {}

  name: string | null = null;

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.name = params.get('name');
    });
  }
}
