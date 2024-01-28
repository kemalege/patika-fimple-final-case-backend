const searchHelper = (searchKey, query, req) => {
    // console.log(req.query.search);
    if (req.query.search) {
        const searchObject = {};

        const regex = new RegExp(req.query.search, "i");
        searchObject[searchKey] = regex;

        return query.where(searchObject);
    }
    return query;
};
const populateHelper = (query, population) => {

    return query.populate(population);
}
const questionSortHelper = (query, req) => {

    const sortKey = req.query.sortBy;

    if(sortKey === "most-answered"){
        return query.sort("-answerCount");
    }
    if(sortKey === "most-liked"){
        return query.sort("-likeCount");
    }
    return query.sort("-createdAt");
}
const dateRangeHelper = (field, query, req) => {
    const startDate = req.body.startDate;
    const endDate = req.body.endDate;

    console.log(startDate, endDate);

    if (startDate && endDate) {
        const start = new Date(startDate);
        const end = new Date(endDate);

        query = query.where(field).gte(start).lte(end);
    } else if (startDate) {
        const start = new Date(startDate);
        query = query.where(field).gte(start);
    } else if (endDate) {
        const end = new Date(endDate);
        query = query.where(field).lte(end);
    }

    return query;
};

const paginationHelper = async (totalDocument, query,req) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    
    const pagination = {};
    const total = totalDocument;

    if(startIndex > 0) {
        pagination.previous = {
            page : page - 1,
            limit : limit
        }
    }
    if(endIndex < total) {
        pagination.next = {
            page : page + 1,
            limit : limit
        }
    }
    return {
        query: query === undefined ? undefined : query.skip(startIndex).limit(limit),
        pagination : pagination,
        startIndex,
        limit
    };
};

export {searchHelper, populateHelper, paginationHelper, questionSortHelper, dateRangeHelper};
