import multer from "multer";
//Multer is a Node.js middleware used to upload files from the frontend
//  to the backend, such as profile pictures, PDFs, documents, and videos.

/*you're using Multer to receive uploaded files
 and temporarily store them inside the public/temp folder.*/

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "./public/temp")
    },
    filename: function (req, file, cb) {
      
      cb(null, file.originalname)
    }
  })
  
export const upload = multer({ 
    storage, 
})