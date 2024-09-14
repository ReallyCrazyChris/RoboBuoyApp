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
        path: "race",
        component: () => import("pages/RacePage.vue"),
      },

      {
        path: "raceedit",
        component: () => import("pages/RaceEditPage.vue"),
      },

      {
        path: "regattaparticipants",
        component: () => import("pages/RegattaParticipantsPage.vue"),
      },

      {
        path: "participantEdit",
        component: () => import("pages/ParticipantEditPage.vue"),
      },

      {
        path: "raceresult",
        component: () => import("pages/RaceResultPage.vue"),
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
