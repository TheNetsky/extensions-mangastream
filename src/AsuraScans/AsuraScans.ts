/* eslint-disable linebreak-style */
import {
    LanguageCode,
    SourceInfo,
    TagType,
    ContentRating
} from 'paperback-extensions-common'

import {
    MangaStream,
    getExportVersion
} from '../MangaStream'

const ASURASCANS_DOMAIN = 'https://www.asurascans.com'

export const AsuraScansInfo: SourceInfo = {
    version: getExportVersion('0.0.3'),
    name: 'AsuraScans',
    description: 'Extension that pulls manga from AsuraScans',
    author: 'Netsky',
    authorWebsite: 'http://github.com/TheNetsky',
    icon: 'icon.png',
    contentRating: ContentRating.MATURE,
    websiteBaseURL: ASURASCANS_DOMAIN,
    sourceTags: [
        {
            text: 'Notifications',
            type: TagType.GREEN
        },
        {
            text: 'CloudFlare',
            type: TagType.RED
        },
        {
            text: 'Buggy',
            type: TagType.RED
        }
    ]
}

export class AsuraScans extends MangaStream {
    //FOR ALL THE SELECTIONS, PLEASE CHECK THE MangaSteam.ts FILE!!!

    baseUrl: string = ASURASCANS_DOMAIN
    languageCode: LanguageCode = LanguageCode.ENGLISH

    override sourceTraversalPathName = 'comics'

    override requestManager = createRequestManager({
        requestsPerSecond: 1.5,
        requestTimeout: 15000,
    });

    override async getChapterDetails(mangaId: string, chapterId: string): Promise<ChapterDetails> {
        const request = createRequestObject({
            url: `${this.baseUrl}/${chapterId}/`,
            method: 'GET',
            headers: this.constructHeaders({}),
        })

        const response = await this.requestManager.schedule(request, 1)
        this.CloudFlareError(response.status)
        const $ = this.cheerio.load(response.data)
        const details =  this.parser.parseChapterDetails($, mangaId, chapterId)
        // removes a page in the website chapter that produces a 404 error
        details.pages = details.pages.filter(function(e) { return e !== 'https://www.asurascans.com/wp-content/uploads/2021/04/page100-10.jpg' })
        return details
    }
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

    override homescreen_PopularToday_enabled = true

    override homescreen_LatestUpdate_enabled = true

    override homescreen_NewManga_enabled = false

    override homescreen_TopAllTime_enabled = true
    override homescreen_TopMonthly_enabled = true
    override homescreen_TopWeekly_enabled = true

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

}