const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const { Client } = require("elasticsearch");
const client = new Client({
  node: "http://localhost:9200",
});


app.post("/search-all", async (req, res, next) => {
    const {phrase} = req.body;
    const result = await client.search({
        index: "metaphors",
        body: {
        size: 75,
        query: {
            bool: {
            should: [
                {
                match: { "Poem Name": { query: phrase, operator: "AND" } },
                },
                {
                match: { "Poet": { query: phrase, operator: "AND" } },
                },
                {
                match: { "Year": { query: phrase, operator: "AND" } },
                },
                {
                match: { "Line": { query: phrase, operator: "AND" } },
                },
                {
                match: { "Metaphorical Terms": { query: phrase, operator: "AND" } },
                },
                {
                match: { "Source Domain": { query: phrase, operator: "AND" } },
                },
                {
                match: { "Target Domain": { query: phrase, operator: "AND" } },
                }
            ],
            },
        },
        highlight: {
            fields: {
            "Poem Name": {},
            "Poet": {},
            "Year":{},
            "Line": {},
            "Metaphorical Terms": {},
            "Target Domain": {},
            "Source Domain": {}
            },
            pre_tags: "<b>",
            post_tags: "</b>",
        },
        },
    });
    const modifiedHits = result.hits.hits.map((hit) => {
        const sourceKeys = Object.keys(hit._source);
        const highlightKeys = Object.keys(hit.highlight);

        sourceKeys.forEach((sourceKey) => {
        if (highlightKeys.includes(sourceKey)) {
            hit._source[sourceKey] = hit.highlight[sourceKey][0];
        }
        });

        return hit;
    });

    const modifiedResult = {
        hits: modifiedHits,
    };
    console.log(modifiedResult)
    res.json(modifiedResult);
});

app.post("/search-category", async (req, res, next) => {
    const {category, phrase} = req.body;
    const result = await client.search({
        index: "metaphors",
        body: {
        size: 75,
        query: {
            bool: {
            must: [
                {
                match: { [category]: { query: phrase, operator: "AND" } },
                },
            ],
            },
        },
        highlight: {
            fields: {
            [category]: {}
            },
            pre_tags: "<b>",
            post_tags: "</b>",
        },
        },
    });
    const modifiedHits = result.hits.hits.map((hit) => {
        const sourceKeys = Object.keys(hit._source);
        const highlightKeys = Object.keys(hit.highlight);

        sourceKeys.forEach((sourceKey) => {
        if (highlightKeys.includes(sourceKey)) {
            hit._source[sourceKey] = hit.highlight[sourceKey][0];
        }
        });

        return hit;
    });

    const modifiedResult = {
        hits: modifiedHits,
    };
    console.log(modifiedResult)
    res.json(modifiedResult);
});

// app listen with port
app.listen(3001, () => console.log("App listening on http://localhost:3001"));