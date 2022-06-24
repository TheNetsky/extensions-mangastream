/* eslint-disable linebreak-style */
import { MangaStreamParser } from '../MangaStreamParser'
import { Chapter, LanguageCode } from 'paperback-extensions-common'

import { convertDate } from '../LanguageUtils'

export class KrawParser extends MangaStreamParser {
    override parseChapterList($: CheerioSelector, mangaId: string, source: any): Chapter[] {
        const chapters: Chapter[] = []
        let langCode = this.parseLanguageCode(mangaId)

        // if (mangaId.toUpperCase().endsWith('-RAW') && source.languageCode == 'gb') langCode = LanguageCode.KOREAN

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
    parseLanguageCode(mangaId: string): LanguageCode {
        console.log(mangaId)
        if (mangaId.includes('chinese')) return LanguageCode.CHINEESE
        if (mangaId.includes('english')) return LanguageCode.ENGLISH
        return LanguageCode.KOREAN
    }
}