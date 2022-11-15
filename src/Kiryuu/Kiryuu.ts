/* eslint-disable linebreak-style */
import {
  LanguageCode,
  SourceInfo,
  TagType,
  ContentRating,
} from "paperback-extensions-common";

import { MangaStream, getExportVersion } from "../MangaStream";

import { KiryuuParser } from "./KiryuuParser";

const KIRYUU_DOMAIN = "https://asura.gg";

export const AsuraScansInfo: SourceInfo = {
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
      text: "CloudFlare",
      type: TagType.RED,
    },
    {
      text: "Buggy",
      type: TagType.RED,
    },
  ],
};

export class Kiryuu extends MangaStream {
  //FOR ALL THE SELECTIONS, PLEASE CHECK THE MangaSteam.ts FILE!!!

  baseUrl: string = KIRYUU_DOMAIN;
  languageCode: LanguageCode = LanguageCode.ENGLISH;

  override readonly parser: KiryuuParser = new KiryuuParser();

  override sourceTraversalPathName = "manga";

  override requestManager = createRequestManager({
    requestsPerSecond: 2,
    requestTimeout: 15000,
  });

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

  override homescreen_LatestUpdate_enabled = true;

  override homescreen_NewManga_enabled = false;

  override homescreen_TopAllTime_enabled = true;
  override homescreen_TopMonthly_enabled = true;
  override homescreen_TopWeekly_enabled = true;

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
