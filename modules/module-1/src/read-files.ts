import { Dirent } from "node:fs";
// import { readFile } from "node:fs/promises";
import { readdir, stat } from "node:fs/promises";
import { join, extname } from "node:path";

// function readFiles(path: string): Promise<Entry> {

// }


// OBJECTS
type Entry = EntryFile | EntryDirectory;

interface EntryDirectory {
    name: string;
    path: string;
    kind: "folder"
    children: Entry[];
    fileTypeArray?: Array<string>
}

interface EntryFile {
    name: string;
    path: string;
    kind: "file"
    fileFormat: string;
    size: number;
}

interface SummaryTotals {
    totalSubfolders: number,
    totalFiles: number,
    fileSizeTotals: number,
}

interface DirOptions {
    encoding: 'utf8';
    withFileTypes: true;
    recursive: false;
}


const defaultOptions: DirOptions = {
    encoding: 'utf8',
    withFileTypes: true,
    recursive: false
}



export class DirectoryScanner {
    path: string;

    constructor(path: string) {
        this.path = path
    }

    async analyzeResults() {
        let entries = await this.ReadDir(this.path, defaultOptions)
        const items = this.analyzeDirectory(entries)
        return items
    }

    async ReadDir(path: string, options: DirOptions) {
        try {
            const files = await readdir(path, options)
            return files;
        } catch (err) {
            throw err;
        }
    }

    async analyzeDirectory(results: Dirent[]): Promise<Entry[]> {
        const items: Entry[] = []
        for (const entry of results) {
            if (entry.isDirectory() === true) {
                const folderPath = join(entry.parentPath, entry.name);
                const childEntries = await this.ReadDir(folderPath, defaultOptions)
                const nestedItems = await this.analyzeDirectory(childEntries);


                const directory: EntryDirectory = {
                    name: entry.name,
                    path: join(entry.parentPath, entry.name),
                    children: nestedItems,
                    kind: "folder"
                }
                items.push(directory)
            }
            else if (entry.isFile()) {
                const pathVar = join(entry.parentPath, entry.name);
                const item: EntryFile = {
                    name: entry.name,
                    path: pathVar,
                    kind: "file",
                    fileFormat: extname(entry.name),
                    size: (await stat(pathVar)).size
                }
                items.push(item)
            }
        }
        return items;
    }

    printTree(items: Entry[], depth: number = 0): void {
        if (items.length != 0) {
            for (const entry of items) {
                if (entry.kind === "folder") {
                    console.log(`${"│    ".repeat(depth)}├──${entry.name}`)
                    this.printTree(entry.children, depth + 1)
                }
                else if (entry.kind === "file") {
                    console.log(`${"│    ".repeat(depth)}└──${entry.name}`)
                }
            }
        }
        else {
            console.log("No files to show.")
        }
    }

    printSummary(totals: SummaryTotals) {

        console.log(`
Summary of ${this.path}:
    Total Files: ${totals.totalFiles}
    Total Subfolders: ${totals.totalSubfolders}
    Total File Size: ${totals.fileSizeTotals} bytes.
        `)
    }



    async displayResults() {
        const items = await this.analyzeResults();
        console.log(`Parent Folder: ${this.path}\n`)
        this.printTree(items);
        const totals = this.calculateTotals(items)
        this.printSummary(totals)
    }

    calculateTotals(items: Entry[]): SummaryTotals {
        let totalSubfolders = 0;
        let totalFiles = 0;
        let fileSizeTotals = 0;
        for (const entry of items) {
            if (entry.kind === "folder") {
                totalSubfolders += 1
                const childTotals = this.calculateTotals(entry.children)
                totalFiles += childTotals.totalFiles
                fileSizeTotals += childTotals.fileSizeTotals
                totalSubfolders += childTotals.totalSubfolders
            }

            else if (entry.kind === "file") {
                fileSizeTotals += entry.size
                totalFiles += 1
            }
        }
        const totals: SummaryTotals = {
            totalSubfolders: totalSubfolders,
            totalFiles: totalFiles,
            fileSizeTotals: fileSizeTotals
        }
        return totals
    }






}
