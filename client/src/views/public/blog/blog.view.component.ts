import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'blog-view',
    styleUrls: ['blog.component.css'],
    templateUrl: 'blog.view.component.html'
})

export class BlogViewComponent implements OnInit {

  public static readonly imports = [];
  public blog: any;

  constructor(
    private route: ActivatedRoute
  ) { }

    ngOnInit() {
      this.blog = this.route.snapshot.data.blog;
      console.log(this.blog.activity);
    }

  public getDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString('de-DE');
  }
}
