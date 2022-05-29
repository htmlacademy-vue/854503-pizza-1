export const routes = [
  {
    path: "/index",
    name: "Index",
    component: () => import("../views/Index"),
    children: [
      {
        path: "login",
        component: () => import("../views/Login"),
      },
    ],
  },
  {
    path: "/cart",
    name: "Cart",
    component: () => import("../views/Cart"),
    children: [
      {
        path: "login",
        component: () => import("../views/Login"),
      },
      {
        path: "success",
        component: () => import("../views/Popup"),
      },
    ],
  },
  {
    path: "/orders",
    name: "Orders",
    component: () => import("../views/Orders"),
    meta: {
      layout: "UserLayout",
    },
  },
  {
    path: "/profile",
    name: "Profile",
    component: () => import("../views/Profile"),
    meta: {
      layout: "UserLayout",
    },
  },
];

export default routes;
