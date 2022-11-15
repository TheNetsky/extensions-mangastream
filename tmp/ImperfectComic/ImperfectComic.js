"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImperfectComic = exports.ImperfectComicInfo = void 0;
/* eslint-disable linebreak-style */
const paperback_extensions_common_1 = require("paperback-extensions-common");
const MangaStream_1 = require("../MangaStream");
const IMPERFECTCOMIC_DOMAIN = 'https://imperfectcomic.org';
exports.ImperfectComicInfo = {
    version: (0, MangaStream_1.getExportVersion)('0.0.2'),
    name: 'ImperfectComic',
    description: 'Extension that pulls manga from ImperfectComic',
    author: 'Netsky',
    authorWebsite: 'http://github.com/TheNetsky',
    icon: 'icon.png',
    contentRating: paperback_extensions_common_1.ContentRating.MATURE,
    websiteBaseURL: IMPERFECTCOMIC_DOMAIN,
    sourceTags: [
        {
            text: 'Notifications',
            type: paperback_extensions_common_1.TagType.GREEN
        }
    ]
};
class ImperfectComic extends MangaStream_1.MangaStream {
    constructor() {
        //FOR ALL THE SELECTIONS, PLEASE CHECK THE MangaSteam.ts FILE!!!
        super(...arguments);
        this.baseUrl = IMPERFECTCOMIC_DOMAIN;
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
        this.homescreen_NewManga_enabled = false;
        this.homescreen_TopAllTime_enabled = true;
        this.homescreen_TopMonthly_enabled = true;
        this.homescreen_TopWeekly_enabled = true;
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
exports.ImperfectComic = ImperfectComic;
