/* eslint-disable linebreak-style */
import {
  LanguageCode,
  SourceInfo,
  TagType,
  ContentRating,
} from "paperback-extensions-common";

import { MangaStream, getExportVersion } from "../MangaStream";

import { KiryuuParser } from "./KiryuuParser";

const KIRYUU_DOMAIN = "https://kiryuu.id";

export const KiryuuInfo: SourceInfo = {
  version: getExportVersion("0.0.6"),
  name: "Kiryuu",
  description: "Extension that pulls manga from Kiryuu",
  author: "NaufalJCT48",
  authorWebsite: "http://github.com/naufaljct48",
  icon: "icon.png",
  contentRating: ContentRating.MATURE,
  websiteBaseURL: KIRYUU_DOMAIN,
  sourceTags: [
    {
      text: "Notifications",
      type: TagType.GREEN,
    },
    {
      text: "Indonesian",
      type: TagType.GREY,
    },
  ],
};

export class Kiryuu extends MangaStream {
  //FOR ALL THE SELECTIONS, PLEASE CHECK THE MangaSteam.ts FILE!!!

  baseUrl: string = KIRYUU_DOMAIN;
  languageCode: LanguageCode = LanguageCode.INDONESIAN;

  override readonly parser: KiryuuParser = new KiryuuParser();

  override sourceTraversalPathName = "manga";

  override requestManager = createRequestManager({
    requestsPerSecond: 2,
    requestTimeout: 15000,
  });

  override dateMonths = {
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
  override dateTimeAgo = {
    now: ["detik lalu"],
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

  override homescreen_PopularToday_enabled = true;
  override homescreen_PopularToday_selector =
    "h2:contains(Terpopuler Hari Ini)";

  override homescreen_LatestUpdate_enabled = true;
  override homescreen_LatestUpdate_selector_box = "h2:contains(Project Update)";

  override homescreen_NewManga_enabled = false;
  override homescreen_NewManga_selector = "h2:contains(Rilisan Terbaru)";

  override homescreen_TopAllTime_enabled = false;
  override homescreen_TopMonthly_enabled = false;
  override homescreen_TopWeekly_enabled = false;

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

  override manga_tag_selector_box = ".seriestugenre";
  override manga_selector_author = "td:contains(Author)+td";
  override manga_selector_artist = "td:contains(Artist)+td";
  override manga_selector_status = "td:contains(status)+td";
}
