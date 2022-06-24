/* eslint-disable linebreak-style */
import { MangaStreamParser } from '../MangaStreamParser'
import { 
    Chapter, 
    LanguageCode, 
    Manga,
    MangaStatus,
    Tag,
    TagSection
} from 'paperback-extensions-common'

import { convertDate } from '../LanguageUtils'

/*
    Differences in template:
        - altTitles are listed in a different way.
        - Author, Status, and Artist are in an html table.
        - Description is inside a p tag within the div.
    Everything else is the same as the default Parser.
*/

export class KrawParser extends MangaStreamParser {

    parseMangaDetails($: CheerioSelector, mangaId: string, source: any): Manga {
        const titles = []
        titles.push(this.decodeHTMLEntity($('h1.entry-title').text().trim()))

        const altTitles = $('.seriestualt').text().split(',') // Different selector than template
        for (const title of altTitles) {
            if (title == '') continue
            titles.push(this.decodeHTMLEntity(title.trim()))
        }

        const image = this.getImageSrc($('img', 'div[itemprop="image"]'))
        const description = this.decodeHTMLEntity($('div[itemprop="description"] p').text().replace('Summary', '').trim()) // Descritpion is in a p tag

        const arrayTags: Tag[] = []
        for (const tag of $('a', source.manga_tag_selector_box).toArray()) {
            const label = $(tag).text().trim()
            const id = encodeURI($(tag).attr('href')?.replace(`${source.baseUrl}/${source.manga_tag_TraversalPathName}/`, '').replace(/\//g, '') ?? '')
            if (!id || !label) continue
            arrayTags.push({ id: id, label: label })
        }
        const tagSections: TagSection[] = [createTagSection({ id: '0', label: 'genres', tags: arrayTags.map(x => createTag(x)) })]
        
        // The three tags below are in an html table, which is orgnized much differently than the template.
        let author
        let rawStatus = 'ongoing'
        let artist
        for  (const tableRow of $('table.infotable').find('tr').toArray()){
            const description = $('td', tableRow).first().text().trim()
            const value = $('td', tableRow).next().text().trim()

            switch(description){
                case 'Author':
                    author = value
                    break
                case 'Status':
                    rawStatus = value
                    break
                case 'Artist':
                    artist = value
                    break
                default:
                    break
            }
            continue
        }

        let status = MangaStatus.ONGOING
        switch (rawStatus.toLowerCase()) {
            case source.manga_StatusTypes.ONGOING.toLowerCase():
                status = MangaStatus.ONGOING
                break
            case source.manga_StatusTypes.COMPLETED.toLowerCase():
                status = MangaStatus.COMPLETED
                break
            default:
                status = MangaStatus.ONGOING
                break
        }
        return createManga({
            id: mangaId,
            titles: titles,
            image: image ? image : source.fallbackImage,
            status: status,
            author: author == '' ? 'Unknown' : author,
            artist: artist == '' ? 'Unknown' : artist,
            tags: tagSections,
            desc: description,
        })
    }
    
    /*
        Added langauge code for Chinese sources when it is labeled in the url.
        For Example, 'c95-twilight-road-tomo-sawatte-onii-chan-azur-lane-chinese' will have language code Chinese.
    */
    override parseChapterList($: CheerioSelector, mangaId: string, source: any): Chapter[] { 
        const chapters: Chapter[] = []
        let langCode = source.languageCode

        if (mangaId.toUpperCase().endsWith('-RAW') && source.languageCode == 'gb') langCode = LanguageCode.KOREAN
        if(mangaId.includes('chinese')) langCode = LanguageCode.CHINEESE

        for (const chapter of $(source.chapter_selector_item, source.chapter_selector_box).toArray()) {
            const title = $('span.chapternum', chapter).text().trim()
            const id = this.idCleaner($('a', chapter).attr('href') ?? '')
            const date = convertDate($('span.chapterdate', chapter).text().trim(), source)
            const getNumber = chapter.attribs['data-num'] ?? ''
            const chapterNumberRegex = getNumber.match(/(\d+\.?\d?)+/)
            let chapterNumber = 0
            if (chapterNumberRegex && chapterNumberRegex[1]) chapterNumber = Number(chapterNumberRegex[1])

            if (!id) continue
            chapters.push(createChapter({
                id: id,
                mangaId,
                name: title,
                langCode: langCode,
                chapNum: chapterNumber,
                time: date,
            }))
        }
        return chapters
    }
}