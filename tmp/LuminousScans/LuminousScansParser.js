"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LuminousScansParser = void 0;
const MangaStreamParser_1 = require("../MangaStreamParser");
class LuminousScansParser extends MangaStreamParser_1.MangaStreamParser {
    parseTags($, source) {
        const arrayTags = [];
        for (const tag of $(source.tags_selector_item, source.tags_selector_box).toArray()) {
            const label = source.tags_selector_label ? $(source.tags_selector_label, tag).text().trim() : $(tag).text().trim();
            const id = label.toLowerCase().normalize('NFKD').replace(/[\u0300-\u036f]/g, '').replace(/(\/|\s)/g, '-').trim();
            if (!id || !label)
                continue;
            arrayTags.push({ id: id, label: label });
        }
        const tagSections = [createTagSection({ id: '0', label: 'genres', tags: arrayTags.map(x => createTag(x)) })];
        return tagSections;
    }
}
exports.LuminousScansParser = LuminousScansParser;
