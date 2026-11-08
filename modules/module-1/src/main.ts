// Build your module project here as you learn.
import { DirectoryScanner } from "./read-files";

const testFolderScan = new DirectoryScanner("modules/module-1/Parent Folder");
const emptyFolderScan = new DirectoryScanner("modules/module-1/Parent Folder/Child Folder 1/Empty Folder");
const fakeFolderScan = new DirectoryScanner("C:/repos/school/fakeFolder");

emptyFolderScan.displayResults().catch(console.error)
testFolderScan.displayResults().catch(console.error)

fakeFolderScan.displayResults().catch((error: unknown) => {
    if (error instanceof Error
        &&
        "code" in error
    ) {
        if (error.code === "ENOENT") {
            console.log(`
Unable to scan: directory not found.
Path: ${fakeFolderScan.path}        
        `)
        }
        else {
            console.log(`
An unknown error has occurred.
Error code: ${error.code}
${error.message}
${error.cause}
${error.stack}
                `)
        }
    }
})


