import { Dirent } from "node:fs";
import { readFile } from "node:fs/promises";
import { readdir } from "node:fs/promises";
import { join } from "node:path";

// function readFiles(path: string): Promise<Entry> {

// }


// OBJECTS
interface Entry {
    name: string;
    path: string;
    kind: "file" | "folder";
}

interface Directory {
    name: string;
    path: string;
    children: number;
}

interface DirOptions {
    encoding: 'utf8';
    withFileTypes: true;
    recursive: false;
}

const defaulotOptions: DirOptions = {
    encoding: 'utf8',
    withFileTypes: true,
    recursive: false
}




// FUNCTIONS
async function ReadDir(path: string, options: DirOptions) {
    try {
        const files = await readdir(path, options)
        // console.log(files)
        return files;
    } catch (err) {
        console.error(err);
        throw err;
    }
}

function analyzeDirectory(results: Dirent[]): Entry[] {
    const items: Entry[] = [];
    for (const entry of results) {
        // console.log(`Name: ${entry.name}`)
        // console.log(`Is directory: ${entry.isDirectory()}`)
        if (entry.isDirectory() == true) {
            const item: Entry = {
                name: entry.name,
                path: join(entry.parentPath, entry.name),
                kind: "folder"
            }
            items.push(item)
        }
        else if (entry.isFile()) {
            const item: Entry = {
                name: entry.name,
                path: join(entry.parentPath, entry.name),
                kind: "file"
            }
            items.push(item)
        }
    }
    return items;
}


async function printResult() {
    let entries = await ReadDir("C:/repos/school/CSE310-Applied-Programming/modules", defaulotOptions)
    // console.log(`Count: ${entries.length}`)
    // console.log(`Is a directory: ${entries[1].isDirectory()}`)
    // console.log(`Is a file: ${entries[1].isFile()}`)
}

async function analyzeResults() {
    let entries = await ReadDir("C:/repos/school/CSE310-Applied-Programming/modules/module-1", defaulotOptions)
    return analyzeDirectory(entries)
}

async function countChildren(folderPath: string): Promise<number> {
    return (await readdir(folderPath)).length
}




const items = analyzeResults().then(items => console.log(items)).catch(console.error);
console.log(items);