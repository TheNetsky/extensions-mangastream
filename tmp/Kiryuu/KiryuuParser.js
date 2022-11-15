"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KiryuuParser = void 0;
/* eslint-disable linebreak-style */
const MangaStreamParser_1 = require("../MangaStreamParser");
class KiryuuParser extends MangaStreamParser_1.MangaStreamParser {
    parseChapterDetails($, mangaId, chapterId) {
        const data = $.html();
        const pages = [];
        //To avoid our regex capturing more scrips, we stop at the first match of ";", also known as the first ending the matching script.
        let obj = /ts_reader.run\((.[^;]+)\)/.exec(data)?.[1] ?? ""; //Get the data else return null.
        if (obj == "")
            throw new Error(`Failed to find page details script for manga ${mangaId}`); //If null, throw error, else parse data to json.
        obj = JSON.parse(obj);
        if (!obj?.sources)
            throw new Error(`Failed for find sources property for manga ${mangaId}`);
        for (const index of obj.sources) {
            //Check all sources, if empty continue.
            if (index?.images.length == 0)
                continue;
            index.images.map((p) => {
                //Asura has a dead link at the start of each of their chapters (Thanks to pandeynmn for noticing)
                if (p ==
                    "https://www.asurascans.com/wp-content/uploads/2021/04/page100-10.jpg")
                    return;
                pages.push(encodeURI(p));
            });
        }
        const chapterDetails = createChapterDetails({
            id: chapterId,
            mangaId: mangaId,
            pages: pages,
            longStrip: false,
        });
        return chapterDetails;
    }
}
exports.KiryuuParser = KiryuuParser;
