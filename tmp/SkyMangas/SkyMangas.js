"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SkyMangas = exports.SkyMangasInfo = void 0;
/* eslint-disable linebreak-style */
const paperback_extensions_common_1 = require("paperback-extensions-common");
const MangaStream_1 = require("../MangaStream");
const SKYMANGAS_DOMAIN = 'https://skymangas.com';
exports.SkyMangasInfo = {
    version: (0, MangaStream_1.getExportVersion)('0.0.0'),
    name: 'SkyMangas',
    description: 'Extension that pulls manga from SkyMangas',
    author: 'Netsky',
    authorWebsite: 'http://github.com/TheNetsky',
    icon: 'icon.png',
    contentRating: paperback_extensions_common_1.ContentRating.MATURE,
    websiteBaseURL: SKYMANGAS_DOMAIN,
    sourceTags: [
        {
            text: 'Notifications',
            type: paperback_extensions_common_1.TagType.GREEN
        },
        {
            text: 'Spanish',
            type: paperback_extensions_common_1.TagType.GREY
        }
    ]
};
class SkyMangas extends MangaStream_1.MangaStream {
    constructor() {
        //FOR ALL THE SELECTIONS, PLEASE CHECK THE MangaSteam.ts FILE!!!
        super(...arguments);
        this.baseUrl = SKYMANGAS_DOMAIN;
        this.languageCode = paperback_extensions_common_1.LanguageCode.SPANISH;
        //----DATE SETTINGS
        this.dateMonths = {
            january: 'enero',
            february: 'febrero',
            march: 'marzo',
            april: 'abril',
            may: 'mayo',
            june: 'junio',
            july: 'julio',
            august: 'agosto',
            september: 'septiembre',
            october: 'octubre',
            november: 'noviembre',
            december: 'diciembre'
        };
        this.dateTimeAgo = {
            now: ['less than an hour', 'just now'],
            yesterday: ['ayer'],
            years: ['año', 'ano'],
            months: ['mes', 'meses'],
            weeks: ['semana', 'semanas'],
            days: ['día', 'dia', 'dias'],
            hours: ['hora'],
            minutes: ['minutre'],
            seconds: ['segundo']
        };
        //----MANGA DETAILS SELECTORS
        this.manga_selector_author = 'Autor';
        this.manga_selector_artist = 'Artista';
        this.manga_selector_status = 'Estado';
        /*
        If a website uses different names/words for the status below, change them to these.
        These must also be changed if a different language is used!
        Don't worry, these are case insensitive.
        */
        /*
            manga_StatusTypes = {
                ONGOING: "En cours",
                COMPLETED: "Terminée"
            }
        */
        //----HOMESCREEN SELECTORS
        //Disabling some of these will cause some Home-Page tests to fail, edit these test files to match the setting.
        //Always be sure to test this in the app!
        this.homescreen_PopularToday_enabled = true;
        this.homescreen_PopularToday_selector = 'h2:contains(Popular Hoy)';
        this.homescreen_LatestUpdate_enabled = true;
        this.homescreen_LatestUpdate_selector_box = 'h2:contains(Actualizaciones)';
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
        this.tags_SubdirectoryPathName = '';
        this.tags_selector_box = 'ul.genre';
        this.tags_selector_item = 'li';
        this.tags_selector_label = '';
    }
}
exports.SkyMangas = SkyMangas;
