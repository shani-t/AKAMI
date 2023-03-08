import { Component, OnDestroy, OnInit } from '@angular/core';
import { FlatTreeControl } from '@angular/cdk/tree';
import {
  MatTreeFlatDataSource,
  MatTreeFlattener,
} from '@angular/material/tree';
import { FetchFiles, FetchFiltredFiles } from './store/files.actions';
import { Select, Store } from '@ngxs/store';
import { FilesState } from './store/files.state';
import { debounceTime, distinctUntilChanged, Observable, Subject, takeUntil } from 'rxjs';
import { FileNode } from './interfaces/file-node.interface';
import { FlatNode } from './interfaces/flat-node.interface';


@Component({
  selector: 'app-files',
  styleUrls: ['./files.component.scss'],
  templateUrl: './files.component.html',
})
export class FilesComponent implements OnInit, OnDestroy {
  @Select(FilesState.filteredTree) tree$: Observable<any>;
  @Select(FilesState.loading) loading$!: Observable<boolean>;

  private previousFilterValue: string;
  private unsubscribe$ = new Subject();

  ngOnInit(): void {
    this.tree$.subscribe(res=>{
      this.dataSource.data = res;
      this.treeControl.expandAll();
    })
    this.store.dispatch(new FetchFiles());
  }
  private _transformer = (node: FileNode, level: number) => {
    return {
      expandable: !!node.directories && node.directories.length > 0,
      name: node.name,
      files: node.files,
      level: level
    };
  };

  treeControl = new FlatTreeControl<FlatNode>(
    node => node.level,
    node => node.expandable
  );

  treeFlattener = new MatTreeFlattener(
    this._transformer,
    node => node.level,
    node => node.expandable,
    node => node.directories
  );

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);
  hasChild = (_: number, node: FlatNode) => node.expandable;

  constructor( private store: Store) {
  }


  applyFilter(filterText: string) {
    filterText = filterText.trim().toLowerCase();
    if(filterText === ""){
      this.dataSource.data = this.store.selectSnapshot(FilesState.tree);
      return;
    }

    if (filterText === this.previousFilterValue) {
      this.dataSource.data = this.store.selectSnapshot(FilesState.filteredTree);
      return;
    } else {
      this.previousFilterValue = filterText;
      this.store.dispatch(new FetchFiltredFiles(filterText)
      ).pipe(
        takeUntil(this.unsubscribe$),
        debounceTime(500),
        distinctUntilChanged(),
      ).subscribe();
  
      
    }

  }
  isDisabled(e) {
    return e.scrollWidth <= e.clientWidth;
  }
  ngOnDestroy() {
    this.unsubscribe$.next({});
    this.unsubscribe$.complete();
  }

}
