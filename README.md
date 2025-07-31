# simple ftp

a simple ftp server, served with express.js  


### to upload a file
Example with curl (replace `/path/to/file.txt` with the file's path)
`curl -F "file=@/path/to/file.txt" http://localhost:3000/upload`  

Expected response:
```
File uploaded successfully. Access it at: /uploads/<filename>
```

- `filename` is the name of the file served, which is provided by the user itself
- it is used to download the file
- the file with the same name is stored in `uploads/`


### to download a file
`curl -O http://localhost:3000/uploads/<filename>`
