const routes = [
  {
    path: "/",
    component: () => import("layouts/BasicLayout.vue"),
    children: [
      {
        path: "",
        component: () => import("pages/IndexPage.vue"),
      },

      {
        path: "regattainfo",
        component: () => import("pages/RegattaInfoPage.vue"),
      },

      {
        path: "regattaedit",
        component: () => import("pages/RegattaEditPage.vue"),
      },

      {
        path: "racetimer",
        component: () => import("pages/RaceTimerPage.vue"),
      },

      {
        path: "racescore",
        component: () => import("pages/RaceScorePage.vue"),
      },

      {
        path: "regattaresults",
        component: () => import("pages/RegattaResultsPage.vue"),
      },

      {
        path: "course",
        component: () => import("pages/CourseEditPage.vue"),
      },

      {
        path: "vmc",
        component: () => import("pages/VmcPage.vue"),
      },

      {
        path: "robots",
        component: () => import("pages/RobotsPage.vue"),
      },

      {
        path: "robotsettings/:deviceid",
        name: "robotsettings",
        props: true,
        component: () => import("pages/RobotSettingsPage.vue"),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
