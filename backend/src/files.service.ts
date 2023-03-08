import { Injectable } from "@nestjs/common";
import { FileNode } from "./interfaces/file-node.interface";
import myJson from './tree.json';
@Injectable()
export class FilesService {
    constructor(){}

    async getAllFiles(): Promise<FileNode[]>{
        return myJson;
    }

    async getFilesFiltered(search: string): Promise<FileNode[]>{
      const clone = JSON.parse(JSON.stringify(myJson));
      return this.filterTree(clone, search);
    }

    filterTree(tree, searchText): Promise<FileNode[]>{
        if (Array.isArray(tree)) {
          for (let i = 0; i < tree.length; i++) {
            tree[i] = this.filterTree(tree[i], searchText);
          }
        } else if (typeof tree === 'object') {
          for (let key in tree) {
             if (searchText != null && key == 'files'){
              tree[key] = tree[key].filter(x=>x.includes(searchText));
            }
            tree[key] = this.filterTree(tree[key], searchText);
          }
        }

        return tree;
    }    

}