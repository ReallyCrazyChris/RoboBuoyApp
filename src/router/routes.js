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
        path: "devices",
        component: () => import("pages/DevicesPage.vue"),
      },
      {
        path: "locationmap",
        component: () => import("pages/LocationmapPage.vue"),
      },
      {
        path: "config/:deviceid",
        name: "configureRoboBuoy",
        props: true,
        component: () => import("pages/ConfigureRoboBuoyPage.vue"),
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
