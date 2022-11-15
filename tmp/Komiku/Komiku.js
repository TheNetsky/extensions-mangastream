"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Komiku = exports.KomikuInfo = void 0;
/* eslint-disable linebreak-style */
const paperback_extensions_common_1 = require("paperback-extensions-common");
const MangaStream_1 = require("../MangaStream");
const KomikuParser_1 = require("./KomikuParser");
const KOMIKU_DOMAIN = "https://komiku.com";
exports.KomikuInfo = {
    version: (0, MangaStream_1.getExportVersion)("0.0.6"),
    name: "Komiku.com",
    description: "Extension that pulls manga from Komiku.com",
    author: "NaufalJCT48",
    authorWebsite: "http://github.com/naufaljct48",
    icon: "icon.png",
    contentRating: paperback_extensions_common_1.ContentRating.MATURE,
    websiteBaseURL: KOMIKU_DOMAIN,
    sourceTags: [
        {
            text: "Notifications",
            type: paperback_extensions_common_1.TagType.GREEN,
        },
        {
            text: "Indonesian",
            type: paperback_extensions_common_1.TagType.GREY,
        },
    ],
};
class Komiku extends MangaStream_1.MangaStream {
    constructor() {
        //FOR ALL THE SELECTIONS, PLEASE CHECK THE MangaSteam.ts FILE!!!
        super(...arguments);
        this.baseUrl = KOMIKU_DOMAIN;
        this.languageCode = paperback_extensions_common_1.LanguageCode.INDONESIAN;
        this.parser = new KomikuParser_1.KomikuParser();
        this.sourceTraversalPathName = "manga";
        this.requestManager = createRequestManager({
            requestsPerSecond: 2,
            requestTimeout: 15000,
        });
        this.dateMonths = {
            january: "januari",
            february: "februari",
            march: "maret",
            april: "april",
            may: "mei",
            june: "juni",
            july: "juli",
            august: "agustus",
            september: "september",
            october: "oktober",
            november: "november",
            december: "desember",
        };
        this.dateTimeAgo = {
            now: ["yang lalu"],
            yesterday: ["kemarin"],
            years: ["tahun"],
            months: ["bulan"],
            weeks: ["minggu"],
            days: ["hari"],
            hours: ["jam"],
            minutes: ["menit"],
            seconds: ["detik"],
        };
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
        this.homescreen_PopularToday_selector = "h2:contains(Baca Komik Terpopuler Hari Ini Online)";
        this.homescreen_LatestUpdate_enabled = true;
        this.homescreen_LatestUpdate_selector_box = "h2:contains(Baca Komik Terbaru Online)";
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
        this.manga_tag_selector_box = ".seriestugenre";
        this.manga_selector_author = "td:contains(Author)";
        this.manga_selector_artist = "td:contains(Artist)";
        this.manga_selector_status = "td:contains(Status)";
    }
}
exports.Komiku = Komiku;
