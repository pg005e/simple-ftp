### simple ftp

a simple ftp server, served with express.js  



##### to upload a file
Example with curl (replace `/path/to/file.txt` with the file's path)
`curl -F "file=@/path/to/file.txt" http://localhost:3000/upload`  

Expected JSON response:
```json
{
  "message": "File uploaded successfully",
  "filename": "4f1a3f4b2c3d4e5f6a7b8c9d",
  "originalName": "file.txt"
}
```

- `filename` is a random server-side filename
- it is used to download the file
- the filename is stored in `uploads/`


##### to download a file
`curl -O http://localhost:3000/download<filename>`
