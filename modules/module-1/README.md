# Overview

I wanted to further my understanding of typescript so I put together this application to learn more about it and practice my programming skills. This project at its core is a directory scanner that can read a directories path, gather some information about it and its contents, then dispaly those results as a tree in the console. 

[Software Demo Video](http://youtube.link.goes.here)

# Development Environment

TypeScript, Node.js and VS Code. 

# Useful Websites

- [Node JS Documentation](https://nodejs.org/api/fs.html#fspromisesreaddirpath-options)
- [Type Script Video Tutorial](https://www.youtube.com/watch?v=d56mG7DezGs)

# Future Work

- Add the ability to format the tree independent of the console so it can be displayed on web pages, in apps, or still in the console.
- In [read-files.ts](src/read-files.ts) in the `EntryDirectory` object I left an option in the future to include an array of the file types inside each directory. 
- Generate links to each files local path on the fly.