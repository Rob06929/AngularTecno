import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { PageVisitService } from './service/page-visit.service';
import { PageVisit } from '../../interfaces/page-visit';

@Component({
  selector: 'app-page-visit',
  imports: [CommonModule],
  templateUrl: './page-visit.component.html',
  styleUrl: './page-visit.component.css'
})
export class PageVisitComponent {
  @Input() public page: string = "";

  pageVisit?: PageVisit;

  constructor(
    private pageVisitService: PageVisitService,
    private cdr: ChangeDetectorRef,
  ) {
    this.incrementPageVisits();
  }

  incrementPageVisits(): void {
    this.pageVisitService.incrementsPageVisits(this.page).subscribe({
      next: (pageVisit: PageVisit) => {
        console.log(pageVisit);
        this.cdr.markForCheck();
        this.pageVisit = pageVisit;
      },
      error: (err) => {
        console.error(err);
        this.cdr.markForCheck();
      },
    });
  }

}
