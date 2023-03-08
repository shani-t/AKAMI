import { Action, State, StateContext, Selector } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { catchError, finalize, map, Observable, of, Subscription, switchMap, tap } from 'rxjs';
import { FilesService } from '../files.service';
import { InitState, SetLoading, FetchFiles, FetchFiltredFiles, SetFilter } from './files.actions';
import { FileNode } from '../interfaces/file-node.interface';


export interface FilesModel {
  searchFilter: string
  tree: FileNode[]; 
  filteredTree: FileNode[]; 
  isLoading: boolean; 
  }
  
  const initialState: FilesModel = {
    searchFilter: null,
    tree: [],
    filteredTree: [],
    isLoading: false,
  };
  
  @State<FilesModel>({
    name: 'Files',
    defaults: initialState,
  })
  @Injectable()
  export class FilesState {
    private filterRequestSubscription: Subscription = null;

    constructor(
      private snackBar: MatSnackBar,
      private filesService: FilesService,
    ) { }

    @Selector([FilesState])
    static loading({ isLoading }: FilesModel): boolean {
      return isLoading;
    }
  
    @Selector([FilesState])
    static tree({ tree }: FilesModel): any {
      return tree;
    }

    @Selector([FilesState])
    static filteredTree({ tree, filteredTree }: FilesModel): any {
      return filteredTree.length ? filteredTree : tree;
    }

    @Selector([FilesState])
    static searchFilter({ searchFilter }: FilesModel): string {
      return searchFilter;
    }


  /** Actions **/
  @Action(InitState)
  InitState(ctx: StateContext<FilesModel>) {
    ctx.setState(initialState);
  }

    @Action(SetLoading)
    SetLoading(ctx: StateContext<FilesModel>, { bool }: SetLoading): any {
      ctx.setState({ ...ctx.getState(), isLoading: bool });
    }

    @Action(SetFilter)
    SetFilter(ctx: StateContext<FilesModel>, { search }: SetFilter): any {
      ctx.setState({ ...ctx.getState(), searchFilter: search });
    }
  

    @Action(FetchFiles)
    FetchFiles(ctx: StateContext<FilesModel>): any {
      ctx.dispatch(new SetLoading(true));
      return this.filesService.getFiles().pipe(
        map((data) => {
            ctx.setState({
              ...ctx.getState(),
              tree: data,
              filteredTree: data
            });
        }),
        catchError(err => {
          console.log(err);
          this.snackBar.open('Internal Server Error', 'OK', {
            duration: 5000,
          });
          return of(null);
        }),
        finalize(() => {
          ctx.dispatch(new SetLoading(false));
        })
      );
    }


    @Action(FetchFiltredFiles)
    FetchFilesFiltered(ctx: StateContext<FilesModel>, {search}) {
      // If the filter query is the same as the previous filter query, return an empty observable to prevent multiple requests
    if (search === ctx.getState().searchFilter) {
      return of([]);
    }

    // Cancel the previous request if there is a new request
    if (this.filterRequestSubscription) {
      this.filterRequestSubscription.unsubscribe();
    }

    ctx.dispatch(new SetLoading(true));
    const filterRequest = this.filesService.getFilesFiltered(search).pipe(
      tap((filteredTree: FileNode[]) => {
        ctx.patchState({ filteredTree });
        ctx.dispatch(new SetLoading(false));
      })
    );

    // Use switchMap to cancel the previous request if there is a new request
    this.filterRequestSubscription = of(search).pipe(
      tap((searchQuery) => {
        ctx.patchState({ searchFilter: searchQuery });
      }),
      switchMap(() => filterRequest)
    ).subscribe();
    return of([]);
  }

  }