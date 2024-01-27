
import { 
    searchHelper,
    populateHelper,
    paginationHelper,
    questionSortHelper
} from './queryMiddlewareHelpers.js';
import asyncErrorWrapper from "express-async-handler";

const applicationQueryMiddleware = function(model,options){

    return asyncErrorWrapper(async function(req,res,next){
        let query = model.find();

        query = searchHelper("status", query, req);

        const total = await model.countDocuments();

        // const paginationResult = await paginationHelper(total, query, req);

        // query = paginationResult.query;
        // const pagination = paginationResult.pagination;

        const queryResults = await query;

        res.queryResults = {
            success : true,
            count : queryResults.length,
            data : queryResults
        }
        next();
    });
};

export {applicationQueryMiddleware};