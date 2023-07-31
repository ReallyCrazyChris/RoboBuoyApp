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
        path: "robobuoysettings/:deviceid",
        name: "robobuoysettings",
        props: true,
        component: () => import("pages/RoboBuoySettingsPage.vue"),
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
