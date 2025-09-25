import multer from 'multer'
import path from 'path'

const storage = multer.diskStorage({
    destination : "productImg/" , 
    filename : (req , file , cb) => {
        cb(null , Date.now() + path.extname(file.originalname));
    }
})

const productImg = multer({storage});

export default productImg;