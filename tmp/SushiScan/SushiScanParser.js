"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SushiScanParser = void 0;
const MangaStreamParser_1 = require("../MangaStreamParser");
class SushiScanParser extends MangaStreamParser_1.MangaStreamParser {
    parseTags($, source) {
        const arrayTags = [];
        for (const tag of $('li', $('.dropdown-menu.c4.genrez')).toArray()) {
            const label = $('label', tag).text().trim();
            const id = $('label', tag).text().toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(' ', '-').trim();
            if (!id || !label)
                continue;
            arrayTags.push({ id: id, label: label });
        }
        const tagSections = [createTagSection({ id: '0', label: 'genres', tags: arrayTags.map(x => createTag(x)) })];
        return tagSections;
    }
}
exports.SushiScanParser = SushiScanParser;
