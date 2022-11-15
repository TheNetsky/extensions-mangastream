"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlackArmy = exports.BlackArmyInfo = void 0;
/* eslint-disable linebreak-style */
const paperback_extensions_common_1 = require("paperback-extensions-common");
const MangaStream_1 = require("../MangaStream");
const BLACKARMY_DOMAIN = 'https://blackarmy.fr';
exports.BlackArmyInfo = {
    version: (0, MangaStream_1.getExportVersion)('0.0.0'),
    name: 'BlackArmy',
    description: 'Extension that pulls manga from BlackArmy',
    author: 'Netsky',
    authorWebsite: 'http://github.com/TheNetsky',
    icon: 'icon.png',
    contentRating: paperback_extensions_common_1.ContentRating.MATURE,
    websiteBaseURL: BLACKARMY_DOMAIN,
    sourceTags: [
        {
            text: 'Notifications',
            type: paperback_extensions_common_1.TagType.GREEN
        },
        {
            text: 'French',
            type: paperback_extensions_common_1.TagType.GREY
        }
    ]
};
class BlackArmy extends MangaStream_1.MangaStream {
    constructor() {
        //FOR ALL THE SELECTIONS, PLEASE CHECK THE MangaSteam.ts FILE!!!
        super(...arguments);
        this.baseUrl = BLACKARMY_DOMAIN;
        this.languageCode = paperback_extensions_common_1.LanguageCode.FRENCH;
        //----DATE SETTINGS
        this.dateMonths = {
            january: 'janvier',
            february: 'février',
            march: 'mars',
            april: 'avril',
            may: 'mai',
            june: 'juin',
            july: 'juillet',
            august: 'août',
            september: 'septembre',
            october: 'octobre',
            november: 'novembre',
            december: 'décembre'
        };
        this.dateTimeAgo = {
            now: ['less than an hour', 'just now'],
            yesterday: ['hier'],
            years: ['year'],
            months: ['mois'],
            weeks: ['semaine'],
            days: ['jour'],
            hours: ['heure'],
            minutes: ['minute'],
            seconds: ['second']
        };
        //----MANGA DETAILS SELECTORS
        this.manga_selector_author = 'Autheur';
        this.manga_selector_artist = 'Artiste';
        this.manga_selector_status = 'Statut';
        /*
        If a website uses different names/words for the status below, change them to these.
        These must also be changed id a different language is used!
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
        this.homescreen_PopularToday_selector = 'h2:contains(Populaire aujourd\'hui)';
        this.homescreen_LatestUpdate_enabled = true;
        this.homescreen_LatestUpdate_selector_box = 'h2:contains(Dernière Sortie)';
        this.homescreen_NewManga_enabled = true;
        this.homescreen_NewManga_selector = 'h3:contains(nouvelle séries)';
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
exports.BlackArmy = BlackArmy;