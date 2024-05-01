import express from 'express';

import data from '../data';

const productRouter = express.Router();
productRouter.get('', (req, res) => {
    res.send(data.products);
});
export default productRouter;
