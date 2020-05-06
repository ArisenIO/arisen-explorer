import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RixService } from '../../services/rix.service';
import { Result } from '../../models';
import { Observable } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';

@Component({
  templateUrl: './block.component.html',
  styleUrls: ['./block.component.scss']
})
export class BlockComponent implements OnInit {

  id$: Observable<number>;
  block$: Observable<Result<any>>;

  constructor(
    private route: ActivatedRoute,
    private rixService: RixService
  ) { }

  ngOnInit() {
    this.id$ = this.route.params.pipe(
      map(params => +params.id)
    );
    this.block$ = this.id$.pipe(
      switchMap(id => this.rixService.getBlockRaw(id))
    );
  }

}
