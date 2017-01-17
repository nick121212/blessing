import upload from './createItem';
import auth from '../../auth';
import multer from 'koa-multer';
import path from "path";

let storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, __dirname + '/../../uploads/');
    },
    filename: function(req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

export const routers = {
    // 'POST /': [auth.passport, auth.permission, uploadObj.single('image'), upload],
    // 'POST /excel': [auth.passport, auth.permission, uploadObj.single('excel'), upload]
}

export const init = (router, sequelizeModel) => {
    const uploadObj = multer({ storage: storage });

    router.addRoute("post", "/", [auth.passport(), uploadObj.single('image'), upload()]);
    router.addRoute("post", "/excel", [auth.passport(), uploadObj.single('excel'), upload()]);
}

export const config = {

}