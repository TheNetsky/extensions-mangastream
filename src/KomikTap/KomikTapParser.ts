/* eslint-disable linebreak-style */
import { MangaStreamParser } from "../MangaStreamParser";
import {
  ChapterDetails,
  Manga,
  MangaStatus,
  Tag,
  TagSection,
} from "paperback-extensions-common";

export class KomikTapParser extends MangaStreamParser {
  override parseChapterDetails(
    $: CheerioStatic,
    mangaId: string,
    chapterId: string
  ): ChapterDetails {
    const data = $.html();
    const pages: string[] = [];

    //To avoid our regex capturing more scrips, we stop at the first match of ";", also known as the first ending the matching script.
    let obj: any = /ts_reader.run\((.[^;]+)\)/.exec(data)?.[1] ?? ""; //Get the data else return null.
    if (obj == "")
      throw new Error(
        `Failed to find page details script for manga ${mangaId}`
      ); //If null, throw error, else parse data to json.
    obj = JSON.parse(obj);

    if (!obj?.sources)
      throw new Error(`Failed for find sources property for manga ${mangaId}`);
    for (const index of obj.sources) {
      //Check all sources, if empty continue.
      if (index?.images.length == 0) continue;
      index.images.map((p: string) => {
        //Asura has a dead link at the start of each of their chapters (Thanks to pandeynmn for noticing)
        if (
          p ==
          "https://www.asurascans.com/wp-content/uploads/2021/04/page100-10.jpg"
        )
          return;
        pages.push(encodeURI(p));
      });
    }

    const chapterDetails = createChapterDetails({
      id: chapterId,
      mangaId: mangaId,
      pages: pages,
      longStrip: false,
    });

    return chapterDetails;
  }
  override parseMangaDetails(
    $: CheerioSelector,
    mangaId: string,
    source: any
  ): Manga {
    const titles = [];
    titles.push(
      this.decodeHTMLEntity(
        $("h1.entry-title").text().replace("Komik ", "").trim()
      )
    );

    const altTitles = $(
      `span:contains(${source.manga_selector_AlternativeTitles}), b:contains(${source.manga_selector_AlternativeTitles})+span, .imptdt:contains(${source.manga_selector_AlternativeTitles}) i, h1.entry-title+span`
    )
      .contents()
      .remove()
      .last()
      .text()
      .split(","); //Language dependant
    for (const title of altTitles) {
      if (title == "") continue;
      titles.push(this.decodeHTMLEntity(title.trim()));
    }

    const author = $("td:contains(Author)+td").contents().last().text().trim(); //Language dependant
    const artist = $("td:contains(Artist)+td").contents().last().text().trim(); //Language dependant
    const image = this.getImageSrc($("img", 'div[itemprop="image"]'));
    const description = this.decodeHTMLEntity(
      $('div[itemprop="description"]').text().trim()
    );

    const arrayTags: Tag[] = [];
    for (const tag of $("a", source.manga_tag_selector_box).toArray()) {
      const label = $(tag).text().trim();
      const id = encodeURI(
        $(tag)
          .attr("href")
          ?.replace(
            `${source.baseUrl}/${source.manga_tag_TraversalPathName}/`,
            ""
          )
          .replace(/\//g, "") ?? ""
      );
      if (!id || !label) continue;
      arrayTags.push({ id: id, label: label });
    }
    const tagSections: TagSection[] = [
      createTagSection({
        id: "0",
        label: "genres",
        tags: arrayTags.map((x) => createTag(x)),
      }),
    ];

    const rawStatus = $(
      `span:contains(${source.manga_selector_status}), .fmed b:contains(${source.manga_selector_status})+span, .imptdt:contains(${source.manga_selector_status}) i`
    )
      .contents()
      .remove()
      .last()
      .text()
      .trim();
    let status = MangaStatus.ONGOING;
    switch (rawStatus.toLowerCase()) {
      case source.manga_StatusTypes.ONGOING.toLowerCase():
        status = MangaStatus.ONGOING;
        break;
      case source.manga_StatusTypes.COMPLETED.toLowerCase():
        status = MangaStatus.COMPLETED;
        break;
      default:
        status = MangaStatus.ONGOING;
        break;
    }
    return createManga({
      id: mangaId,
      titles: titles,
      image: image ? image : source.fallbackImage,
      status: status,
      author: author == "" ? "Unknown" : author,
      artist: artist == "" ? "Unknown" : artist,
      tags: tagSections,
      desc: description,
    });
  }
}
