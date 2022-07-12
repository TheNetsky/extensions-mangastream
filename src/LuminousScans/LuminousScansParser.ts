import {
    Chapter,
    LanguageCode,
    TagSection,
    Tag 
} from 'paperback-extensions-common';

import {
    convertDate
} from '../LanguageUtils'

import { 
    MangaStreamParser
} from '../MangaStreamParser'

export class LuminousScansParser extends MangaStreamParser {
    override parseTags($: CheerioSelector, source: any): TagSection[] {
        const arrayTags: Tag[] = []
        for (const tag of $(source.tags_selector_item, source.tags_selector_box).toArray()) {
            const label = source.tags_selector_label ? $(source.tags_selector_label, tag).text().trim() : $(tag).text().trim()
            const id = label.toLowerCase().normalize('NFKD').replace(/[\u0300-\u036f]/g, '').replace(/(\/|\s)/g, '-').trim()
            if (!id || !label) continue
            arrayTags.push({ id: id, label: label })
        }
        const tagSections: TagSection[] = [createTagSection({ id: '0', label: 'genres', tags: arrayTags.map(x => createTag(x)) })]
        return tagSections
    }

    override parseChapterList($: CheerioSelector, mangaId: string, source: any): Chapter[] {
        const chapters: Chapter[] = []
    
        let langCode = source.languageCode
    
        if (mangaId.toUpperCase().endsWith('-RAW') && source.languageCode == 'gb') langCode = LanguageCode.KOREAN

        const chapterNumberRegex = /(\d+\.?\d?)+/
        const rawChapters = $(source.chapter_selector_item, source.chapter_selector_box).toArray()
        let currentChapter = Number(rawChapters.pop()?.attribs['data-num'].match(chapterNumberRegex)?.[1] ?? 0)
        
        for (const chapter of rawChapters.reverse()) {
            const title = $('span.chapternum', chapter).text().trim()
            const id = this.idCleaner($('a', chapter).attr('href') ?? '')
            const date = convertDate($('span.chapterdate', chapter).text().trim(), source)
            //const getNumber = chapter.attribs['data-num'] ?? ''
            //const chapterNumberRegex = getNumber.match(/(\d+\.?\d?)+/)
            let chapterNumber = currentChapter++
            //if (chapterNumberRegex && chapterNumberRegex[1]) chapterNumber = Number(chapterNumberRegex[1])
    
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
