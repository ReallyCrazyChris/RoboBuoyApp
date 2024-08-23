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
        path: "home",
        component: () => import("pages/IndexPage.vue"),
      },

      {
        path: "regatta",
        component: () => import("pages/RegattaPage.vue"),
      },

      {
        path: "course",
        component: () => import("pages/RaceCoursePage.vue"),
      },

      {
        path: "joinregatta",
        component: () => import("pages/RegattaJoinPage.vue"),
      },

      {
        path: "racetimer",
        component: () => import("pages/RaceTimerPage.vue"),
      },

      {
        path: "vmc",
        component: () => import("pages/VMCPage.vue"),
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
