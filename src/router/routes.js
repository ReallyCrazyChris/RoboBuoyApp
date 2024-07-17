const routes = [
  {
    path: "/",
    component: () => import("layouts/BasicLayout.vue"),
    children: [
      {
        path: "",
        component: () => import("pages/IndexPage.vue"),
      },
      //{
      //  path: "robobuoypositions",
      //  component: () => import("pages/RoboBuoyPositions.vue"),
      //},
      {
        path: "racecourse",
        component: () => import("pages/RaceCourse.vue"),
      },
      {
        path: "myrobots",
        component: () => import("pages/MyRobots.vue"),
      },
      {
        path: "imagelayer",
        component: () => import("pages/ImageLayer.vue"),
      },
      {
        path: "transformlayer",
        component: () => import("pages/TransformLayer.vue"),
      },

      {
        path: "course",
        component: () => import("pages/CoursePage.vue"),
      },

      {
        path: "register",
        component: () => import("pages/RegisterPage.vue"),
      },

      {
        path: "timer",
        component: () => import("pages/TimerPage.vue"),
      },

      {
        path: "vmc",
        component: () => import("pages/VmcPage.vue"),
      },
      {
        path: "horn",
        component: () => import("pages/HornPage.vue"),
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
