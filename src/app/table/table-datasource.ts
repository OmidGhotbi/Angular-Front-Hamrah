import { DataSource } from "@angular/cdk/collections";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { map } from "rxjs/operators";
import { Observable, of as observableOf, merge } from "rxjs";
import { AppService } from "../services/app.service";
import { BehaviorSubject } from "rxjs";

// TODO: Replace this with your own data model type
export interface TableItem {
  city: string;
  country: string;
  firstName: string;
  lastName: string;
  mobile: string;
  email: string;
  resaon: string;
  timstamp: string;
}

export class TableDataSource extends DataSource<TableItem> {
  data: TableItem[];
  unfilteredData: TableItem[] = [];
  paginator: MatPaginator;
  sort: MatSort;

  private dataSubject = new BehaviorSubject<TableItem[]>([]);

  constructor(
    private appService: AppService,
    private displayedColumns: string[]
  ) {
    super();
  }

  filterData(filterText: string) {
    this.data =
      filterText.trim() === ""
        ? this.unfilteredData
        : this.displayedColumns.reduce(
            (acc: any, item: any) => {
              let passed = [];
              let failed = [];
              acc.failed.forEach((element, index) =>
                JSON.stringify(element[item as any])
                  .toLowerCase()
                  .indexOf(filterText) > -1
                  ? passed.push(index)
                  : failed.push(index)
              );
              passed = [...new Set(passed)].map((idx) => acc.failed[idx]);
              failed = [...new Set(failed)].map((idx) => acc.failed[idx]);

              return { passed: [...acc.passed, ...passed], failed };
            },
            { passed: [], failed: this.unfilteredData }
          ).passed;

    this.paginator.pageIndex = 0;
    this.dataSubject.next(this.data);
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<TableItem[]> {
    const dataMutations = [
      // observableOf(this.data),
      this.dataSubject,
      this.paginator.page,
      this.sort.sortChange,
    ];

    return merge(...dataMutations).pipe(
      map(() => {
        return this.getPagedData(this.getSortedData([...this.data]));
      })
    );
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect() {
    this.dataSubject.complete();
  }

  loadData() {
    this.appService.get().subscribe((data) => {
      this.data = data as any;
      this.unfilteredData = data as any;
      this.dataSubject.next(data as TableItem[]);
    });
  }

  private getPagedData(data: TableItem[]) {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    return data.splice(startIndex, this.paginator.pageSize);
  }

  private getSortedData(data: TableItem[]) {
    if (!this.sort.active || this.sort.direction === "") {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort.direction === "asc";
      for (const displayedColumn of this.displayedColumns) {
        if (this.sort.active === displayedColumn) {
          return compare(
            +a[displayedColumn] || a[displayedColumn],
            +b[displayedColumn] || b[displayedColumn],
            isAsc
          );
        }
      }
    });
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a, b, isAsc) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
