/**
 * پروژه‌های اختصاص‌یافته به هر عضو (دادهٔ موقت توسعه)
 */

import type {ProjectSummary} from "@/features/projects";

export const TEAM_MEMBER_PROJECTS: Record<string, ProjectSummary[]> = {
  "tm-101": [
    {id: "team-101-a", nameKey: "items.platformRebrand", status: "active", progress: 64, members: 5, deadline: new Date(Date.now() + 1000 * 60 * 60 * 24 * 8), budget: 18000, updatedAt: new Date()},
    {id: "team-101-b", nameKey: "items.retentionDashboard", status: "completed", progress: 100, members: 3, deadline: new Date(Date.now() - 1000 * 60 * 60 * 24 * 12), budget: 12000, updatedAt: new Date()},
    {id: "team-101-c", nameKey: "items.billingOptimization", status: "on_hold", progress: 38, members: 2, deadline: new Date(Date.now() + 1000 * 60 * 60 * 24 * 16), budget: 9500, updatedAt: new Date()},
  ],
  "tm-102": [
    {id: "team-102-a", nameKey: "items.customerPortal", status: "active", progress: 72, members: 4, deadline: new Date(Date.now() + 1000 * 60 * 60 * 24 * 11), budget: 22000, updatedAt: new Date()},
    {id: "team-102-b", nameKey: "items.crmSync", status: "active", progress: 57, members: 5, deadline: new Date(Date.now() + 1000 * 60 * 60 * 24 * 4), budget: 16800, updatedAt: new Date()},
  ],
  "tm-103": [
    {id: "team-103-a", nameKey: "items.marketingAutomation", status: "active", progress: 48, members: 3, deadline: new Date(Date.now() + 1000 * 60 * 60 * 24 * 10), budget: 11000, updatedAt: new Date()},
    {id: "team-103-b", nameKey: "items.supportFlow", status: "archived", progress: 100, members: 2, deadline: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30), budget: 5000, updatedAt: new Date()},
  ],
  "tm-104": [
    {id: "team-104-a", nameKey: "items.qaPass", status: "completed", progress: 100, members: 2, deadline: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5), budget: 7400, updatedAt: new Date()},
  ],
  "tm-105": [
    {id: "team-105-a", nameKey: "items.researchNotes", status: "on_hold", progress: 27, members: 1, deadline: new Date(Date.now() + 1000 * 60 * 60 * 24 * 20), budget: 3000, updatedAt: new Date()},
  ],
  "tm-106": [
    {id: "team-106-a", nameKey: "items.launchCampaign", status: "active", progress: 81, members: 6, deadline: new Date(Date.now() + 1000 * 60 * 60 * 24 * 6), budget: 25000, updatedAt: new Date()},
    {id: "team-106-b", nameKey: "items.opsWorkflow", status: "completed", progress: 100, members: 3, deadline: new Date(Date.now() - 1000 * 60 * 60 * 24 * 9), budget: 7800, updatedAt: new Date()},
  ],
};
