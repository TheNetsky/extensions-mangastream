"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ManhwaXParser = void 0;
/* eslint-disable linebreak-style */
const MangaStreamParser_1 = require("../MangaStreamParser");
const LanguageUtils_1 = require("../LanguageUtils");
class ManhwaXParser extends MangaStreamParser_1.MangaStreamParser {
    parseUpdatedManga($, time, ids, source) {
        const updatedManga = [];
        let loadMore = true;
        const isLast = this.isLastPage($, 'view_more'); //Check if it's the last page or not, needed for some sites!
        if (!$(source.homescreen_LatestUpdate_selector_item, $(source.homescreen_LatestUpdate_selector_box)?.parent()?.next()).length)
            throw new Error('Unable to parse valid update section!');
        for (const manga of $(source.homescreen_LatestUpdate_selector_item, $(source.homescreen_LatestUpdate_selector_box).parent().next()).toArray()) {
            const id = this.idCleaner($('a', manga).attr('href') ?? '');
            const mangaDate = (0, LanguageUtils_1.convertDateAgo)($('div.epxdate', $('div.adds', manga)).first().text().trim(), source);
            //Check if manga time is older than the time provided, is this manga has an update. Return this.
            if (!id)
                continue;
            if (mangaDate > time) {
                if (ids.includes(id)) {
                    updatedManga.push(id);
                }
                // If there is an id but no mangadate, this means the site forgot to list the chapters on the front page. However this doesn't mean our search is over! (rare)
            }
            else if (id && mangaDate == null) {
                loadMore = true;
                // If the latest mangaDate isn't older than our current time, we're done!
            }
            else {
                loadMore = false;
            }
            //If the site does not have any more pages, we're done!
            if (isLast)
                loadMore = false;
        }
        return {
            ids: updatedManga,
            loadMore,
        };
    }
}
exports.ManhwaXParser = ManhwaXParser;
