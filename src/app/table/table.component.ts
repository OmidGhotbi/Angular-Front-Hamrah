import { AfterViewInit, Component, OnInit, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTable } from "@angular/material/table";
import { TableDataSource, TableItem } from "./table-datasource";
import { AppService } from "../services/app.service";
import { Router } from "@angular/router";
import * as XLSX from "xlsx";

@Component({
  selector: "app-table",
  templateUrl: "./table.component.html",
  styleUrls: ["./table.component.scss"],
})
export class TableComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatTable, { static: false }) table: MatTable<TableItem>;
  dataSource: TableDataSource;

  displayedColumns = [
    "firstName",
    "lastName",
    "mobile",
    "email",
    "reason",
    "country",
    "city",
    "timestamp",
  ];

  constructor(private appService: AppService, private router: Router) {}

  public exportToExcel() {
    const workSheet = XLSX.utils.json_to_sheet(this.dataSource.data, {
      header: this.displayedColumns,
    });
    const workBook: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workBook, workSheet, "Requests");
    XLSX.writeFile(
      workBook,
      "Hamrahe-hamishe - " + new Date().toString() + ".xlsx"
    );
  }

  public deleteAll() {
    if (confirm("Are you sure you want to delete all the requests?")) {
      this.appService.delete().subscribe((data) => {
        window.location.reload(true);
      });
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filterData(filterValue.trim().toLowerCase());
  }

  ngOnInit() {
    this.dataSource = new TableDataSource(
      this.appService,
      this.displayedColumns
    );
    this.dataSource.data = [];
    this.dataSource.loadData();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }
}
