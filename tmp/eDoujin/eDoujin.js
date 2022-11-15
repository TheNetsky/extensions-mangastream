"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.eDoujin = exports.eDoujinInfo = void 0;
/* eslint-disable linebreak-style */
const paperback_extensions_common_1 = require("paperback-extensions-common");
const MangaStream_1 = require("../MangaStream");
const EDOUJIN_DOMAIN = 'https://edoujin.net';
exports.eDoujinInfo = {
    version: (0, MangaStream_1.getExportVersion)('0.0.0'),
    name: 'eDoujin',
    description: 'Extension that pulls manga from eDoujin',
    author: 'Netsky',
    authorWebsite: 'http://github.com/TheNetsky',
    icon: 'icon.png',
    contentRating: paperback_extensions_common_1.ContentRating.ADULT,
    websiteBaseURL: EDOUJIN_DOMAIN,
    sourceTags: [
        {
            text: '18+',
            type: paperback_extensions_common_1.TagType.YELLOW
        }
    ]
};
class eDoujin extends MangaStream_1.MangaStream {
    constructor() {
        //FOR ALL THE SELECTIONS, PLEASE CHECK THE MangaSteam.ts FILE!!!
        super(...arguments);
        this.baseUrl = EDOUJIN_DOMAIN;
        this.languageCode = paperback_extensions_common_1.LanguageCode.ENGLISH;
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
        this.homescreen_LatestUpdate_selector_item = 'div.bsx';
        this.homescreen_NewManga_enabled = false;
        this.homescreen_TopAllTime_enabled = false;
        this.homescreen_TopMonthly_enabled = false;
        this.homescreen_TopWeekly_enabled = false;
        /*
        ----TAG SELECTORS
        PRESET 1 (default): Genres are on homepage ex. https://mangagenki.com/
        tags_SubdirectoryPathName: string = ""
        tags_selector_box: string = "ul.genre"
        tags_selector_item: string = "li"
        tags_selector_label: string = ""
    
        PRESET 2: with /genre/ subdirectory ex. https://mangadark.com/genres/
        tags_SubdirectoryPathName: string = "/genres/"
        tags_selector_box: string = "ul.genre"
        tags_selector_item: string = "li"
        tags_selector_label: string = "span"
        */
        this.tags_SubdirectoryPathName = '/genres/';
        this.tags_selector_box = 'ul.taxindex';
        this.tags_selector_item = 'li';
        this.tags_selector_label = 'span';
    }
}
exports.eDoujin = eDoujin;
