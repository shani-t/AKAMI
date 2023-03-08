export const FETCH_FILTERED_FILES = '[Files] Fetch Filtered files';
export const FETCH_FILES = '[Files] Fetch files';
export const INIT ='[Files] Init Files';
export const SET_LOADING ='[Files] Set Loading';
export const SET_FILTER ='[Files] Set Filter';

export class InitState {
  static readonly type = INIT;
  constructor() { }
}

export class SetLoading {
  static readonly type = SET_LOADING;
  constructor(public bool: boolean) { }
}

export class SetFilter {
  static readonly type = SET_FILTER;
  constructor(public search: string) { }
}

export class FetchFiltredFiles {
  static readonly type = FETCH_FILTERED_FILES;
  constructor(public search: string){}
}

export class FetchFiles {
  static readonly type = FETCH_FILES;
  constructor() { }
}

