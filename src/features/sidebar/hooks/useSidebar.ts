"use client";

/**
 * هوک سایدبار - دسترسی به state جمع/باز بودن سایدبار
 * از طریق SidebarContext که توسط SidebarProvider تأمین می‌شود
 */

import {useContext} from "react";
import {SidebarContext} from "../context/SidebarProvider";

export function useSidebar() {
    return useContext(SidebarContext);
}
