export interface FileNode {
    name?: string;
    files?: string[];
    directories?: FileNode[];
  }