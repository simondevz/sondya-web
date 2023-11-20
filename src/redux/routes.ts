// const BASE = process.env.PUBLIC_SERVER_API;
// const BASE = "https://sondya-backend-production.up.railway.app/api/v1";
const BASE = "http://localhost:8989/api/v1"; // for testing on localhost

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

  //User Profiles
  profile: {
    getProfile: BASE + "/profile/get/", // GET :id
    updateProfile: BASE + "/profile/update/", // PUT :id
    changePassword: BASE + "/profile/update/password/", // PUT :id
    updateSocials: BASE + "/profile/update/socials/", // PUT :id
  },

  //Admin
  sellerProducts: {
    create: BASE + "/seller/product/create", // POST
    update: BASE + "/seller/product/update/", // PUT :id
    delete: BASE + "/seller/product/", // DELETE :id
    getByID: BASE + "/seller/product/", // GET :id
    getAll: BASE + "/seller/products/", // GET :userId
  },

  //Admin
  sellerServices: {
    create: BASE + "/seller/service/create", // POST
    update: BASE + "/seller/service/update/", // PUT :id
    delete: BASE + "/seller/service/", // DELETE :id
    getByID: BASE + "/seller/service/", // GET :id
    getAll: BASE + "/seller/services/", // GET :userId
  },

  //Admin
  adminUsers: {
    create: BASE + "/admin/user/create", // POST
    update: BASE + "/admin/user/update/", // PUT :id
    delete: BASE + "/admin/user/delete/", // DELETE :id
    getByID: BASE + "/admin/user/get/", // GET :id
    getAll: BASE + "/admin/users", // GET
  },

  //Admin
  adminCategories: {
    create: BASE + "/admin/category/create", // POST
    update: BASE + "/admin/category/update/", // PUT :id
    delete: BASE + "/admin/category/", // DELETE :id
    getByID: BASE + "/admin/category/", // GET :id
    getAll: BASE + "/admin/categories", // GET
  },

  //Admin
  adminProducts: {
    create: BASE + "/admin/product/create", // POST
    update: BASE + "/admin/product/update/", // PUT :id
    delete: BASE + "/admin/product/", // DELETE :id
    getByID: BASE + "/admin/product/", // GET :id
    getAll: BASE + "/admin/products", // GET
  },

  //Admin
  adminServices: {
    create: BASE + "/admin/service/create", // POST
    update: BASE + "/admin/service/update/", // PUT :id
    delete: BASE + "/admin/service/", // DELETE :id
    getByID: BASE + "/admin/service/", // GET :id
    getAll: BASE + "/admin/services", // GET
  },

  // Admin
  adminTestimonials: {
    getUnapproved: BASE + "/admin/testimonial/unapproved", // GET
    update: BASE + "/admin/testimonial/update", // PUT
    approve: BASE + "/admin/testimonial/approve/", // PUT :id
    delete: BASE + "/admin/testimonial/delete/", // DELETE :id
  },

  // Users
  users: {
    createTestimonial: BASE + "/user/testimonial/create", // POST: UserTestimonialType
    getALlAPProvedTestimonial: BASE + "/user/testimonial/approved", // GET: List<UserTestimonialType>
  },

  landingPages: {
    contactUs: BASE + "/contactus", // POST
  },
};
