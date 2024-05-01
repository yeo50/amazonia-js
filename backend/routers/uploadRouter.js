/* eslint-disable prefer-template */
/* eslint-disable import/no-extraneous-dependencies */
import express from 'express';
import multer from 'multer';
import { isAuth, isAdmin } from '../utils';

const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, 'frontend/public/images/');
    },
    filename(req, file, cb) {
        const uniqueSuffix = Date.now();
        cb(null, `${uniqueSuffix}.jpg`);
    },
});

const upload = multer({ storage });
const uploadRouter = express.Router();

uploadRouter.post('/', isAuth, isAdmin, upload.single('image'), (req, res) => {
    res.status(201).send({ image: `./images/${req.file.filename}` });
});
export default uploadRouter;
