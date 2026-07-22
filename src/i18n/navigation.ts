/**
 * توابع ناوبری بین‌المللی (next-intl)
 * شامل Link, redirect, usePathname, useRouter و getPathname
 * از قوانین routing تعریف‌شده در routing.ts استفاده می‌کند
 */

import {routing} from './routing';
import {createNavigation} from 'next-intl/navigation';

export const {Link, redirect, usePathname, useRouter, getPathname,} = createNavigation(routing);
