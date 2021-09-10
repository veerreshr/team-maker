import expressAsyncHandler from "express-async-handler";
import axios from 'axios';

const getArticles = expressAsyncHandler(async (req, res) => {
    try {
        let link = "https://api.rss2json.com/v1/api.json?rss_url="+req.query.url;
        const response = await axios.get(link);
        const items = response.data.items;
        let data = [];
        items.forEach((item) => {
            let temp = {};
            temp["thumbnail"] = item.thumbnail;
            temp["title"] = item.title;
            temp["categories"] = item.categories;
            temp["pubDate"] = item.pubDate;
            temp["link"] = item.link;
            data.push(temp);
        });
        res.json(data);
    }
    catch (err) {
        res.status(400);
        throw new Error(err);
    }
});

export {
    getArticles
};