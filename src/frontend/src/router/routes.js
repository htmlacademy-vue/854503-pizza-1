export const routes = [
  {
    path: "/",
    name: "Index",
    component: () => import("../views/Index"),
    children: [
      {
        name: "IndexLogin",
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
        name: "CartLogin",
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
