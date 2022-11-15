"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LuminousScans = exports.LuminousScansInfo = void 0;
/* eslint-disable linebreak-style */
const paperback_extensions_common_1 = require("paperback-extensions-common");
const MangaStream_1 = require("../MangaStream");
const LuminousScansParser_1 = require("./LuminousScansParser");
const LUMINOUSSCANS_DOMAIN = 'https://luminousscans.com';
exports.LuminousScansInfo = {
    version: (0, MangaStream_1.getExportVersion)('0.0.0'),
    name: 'LuminousScans',
    description: 'Extension that pulls manga from LuminousScans',
    author: 'yehru',
    authorWebsite: 'http://github.com/yehrupx',
    icon: 'logo.png',
    contentRating: paperback_extensions_common_1.ContentRating.MATURE,
    websiteBaseURL: LUMINOUSSCANS_DOMAIN,
    sourceTags: [
        {
            text: 'Notifications',
            type: paperback_extensions_common_1.TagType.GREEN
        }
    ]
};
class LuminousScans extends MangaStream_1.MangaStream {
    constructor() {
        //FOR ALL THE SELECTIONS, PLEASE CHECK THE MangaSteam.ts FILE!!!
        super(...arguments);
        this.baseUrl = LUMINOUSSCANS_DOMAIN;
        this.languageCode = paperback_extensions_common_1.LanguageCode.ENGLISH;
        this.sourceTraversalPathName = 'series';
        //----MANGA DETAILS SELECTORS
        /*
        If a website uses different names/words for the status below, change them to these.
        These must also be changed id a different language is used!
        Don't worry, these are case insensitive.
        */
        //manga_StatusTypes: object = {
        //    ONGOING: "ongoing",
        //    COMPLETED: "completed"
        //}
        //----HOMESCREEN SELECTORS
        //Disabling some of these will cause some Home-Page tests to fail, edit these test files to match the setting.
        //Always be sure to test this in the app!
        this.homescreen_PopularToday_enabled = true;
        this.homescreen_LatestUpdate_enabled = true;
        this.homescreen_NewManga_enabled = false;
        this.homescreen_TopAllTime_enabled = true;
        this.homescreen_TopMonthly_enabled = true;
        this.homescreen_TopWeekly_enabled = true;
        //----TAG SELECTORS
        this.tags_SubdirectoryPathName = '/series/';
        this.tags_selector_box = 'ul.genrez';
        this.tags_selector_item = 'li';
        this.tags_selector_label = 'label';
        this.parser = new LuminousScansParser_1.LuminousScansParser();
    }
}
exports.LuminousScans = LuminousScans;
