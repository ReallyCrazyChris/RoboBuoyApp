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
        component: () => import("pages/0_RegattaInfoPage.vue"),
      },

      {
        path: "regattaedit",
        component: () => import("pages/0_RegattaEditPage.vue"),
      },

      {
        path: "courseinfo",
        component: () => import("pages/1_CourseInfoPage.vue"),
      },

      {
        path: "courseedit",
        component: () => import("pages/1_CourseEditPage.vue"),
      },

      {
        path: "coursezoom",
        component: () => import("pages/1_CourseZoomPage.vue"),
      },

      {
        path: "participantinfo",
        component: () => import("pages/2_ParticipantInfoPage.vue"),
      },

      {
        path: "participantedit",
        component: () => import("pages/2_ParticipantEditPage.vue"),
      },

      {
        path: "participantadd",
        component: () => import("pages/2_ParticipantAddPage.vue"),
      },

      {
        path: "participantjoin",
        component: () => import("pages/2_ParticipantJoinPage.vue"),
      },

      {
        path: "racetimer",
        component: () => import("pages/3_RaceTimerPage.vue"),
      },

      {
        path: "racepenulty",
        component: () => import("pages/4_RacePenultyPage.vue"),
      },

      {
        path: "racescore",
        component: () => import("pages/5_RaceScorePage.vue"),
      },

      {
        path: "regattaresults",
        component: () => import("pages/6_RegattaResultsPage.vue"),
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
