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
        path: "robobuoypositions",
        component: () => import("pages/RoboBuoyPositions.vue"),
      },
      {
        path: "racecourse",
        component: () => import("pages/RaceCourse.vue"),
      },
      {
        path: "robobuoysettings/:deviceid",
        name: "robobuoysettings",
        props: true,
        component: () => import("pages/RoboBuoySettings.vue"),
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
