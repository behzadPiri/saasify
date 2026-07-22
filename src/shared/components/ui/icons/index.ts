/**
 * نقطه ورودی یکپارچه تمام آیکون‌های SVG
 * آیکون‌ها از سه دسته تشکیل شده‌اند: عمومی، زبان و تم
 */

import * as GeneralIcons from "./general-icons";
import * as LanguageIcons from "./language-icons";
import * as ThemeIcons from "./theme-icons";

export const Icons = {
    ...GeneralIcons,
    ...LanguageIcons,
    ...ThemeIcons,
};