// const BASE = process.env.PUBLIC_SERVER_API;
const BASE = "https://sondya-backend-production.up.railway.app/api/v1";

export const API_ROUTES = {
  // Authentication
  auth: {
    // user
    register: BASE + "/register", // POST
    login: BASE + "/login", // POST
    forgotPassword: BASE + "/forgot-password", // POST
    verifyEmail: BASE + "/verify-email/", // POST :email
    resetPassword: BASE + "/reset-password/", // POST :email
  },

  //Admin
  adminUsers: {
    create: BASE + "/admin/user/create", // POST
    update: BASE + "/admin/user/update/", // PUT :id
    delete: BASE + "/admin/user/delete/", // DELETE :id
    getByID: BASE + "/admin/user/get/", // GET :id
    getAll: BASE + "/admin/users", // GET
  },
};
