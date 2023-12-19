// const BASE = process.env.PUBLIC_SERVER_API;
const BASE = "https://sondya-backend-production.up.railway.app/api/v1";
const WS_BASE = "wss://sondya-backend-production.up.railway.app/api/v1";
// const BASE = "http://localhost:8989/api/v1"; // for testing on localhost
// const WS_BASE = "ws://localhost:8989/api/v1"; // for testing on localhost

export const API_ROUTES = {
  // home products and categories
  home: {
    // home
    productDetail: BASE + "/product/details/", // GET /:id/:slug(name)
    serviceDetail: BASE + "/service/details/", // GET /:id/:slug(name)
    services: BASE + "/services", // GET
    products: BASE + "/products", // GET
    servicesCategory: BASE + "/services/categories", // GET
    productsCategory: BASE + "/products/categories", // GET
  },

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
    updateCompanyDetails: BASE + "/profile/update/company/", // PUT :id
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
    getProducts: BASE + "/admin/categories/Product", // GET
    getServices: BASE + "/admin/categories/Service", // GET
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

  // Admin
  adminGroupchats: {
    create: BASE + "/admin/groupchat/create", // POST - adminGroupchatType
    getChats: BASE + "/admin/groupchat/list/", // GET :id - admin's id
    delete: BASE + "/admin/groupchat/delete/", // DELETE :id - the groups id
    activate: BASE + "/admin/groupchat/activate/", // PUT :id - the groups id
    suspend: BASE + "/admin/groupchat/suspend/", // PUT :id - the groups id
    update: BASE + "/admin/groupchat/update", // PUT
  },

  // Users
  users: {
    createTestimonial: BASE + "/user/testimonial/create", // POST: UserTestimonialType
    getALlAPProvedTestimonial: BASE + "/user/testimonial/approved", // GET: List<UserTestimonialType>
    getUsers: BASE + "/profile/users",
    getUser: BASE + "/profile/user/", // GET
  },

  // users && services
  userServices: {
    getServices: BASE + "/user/services", // GET
    getServiceById: BASE + "/user/service/", // GET :service_id
    getServiceCategories: BASE + "/user/services/categories", // GET
  },

  // users && products
  userProducts: {
    getProducts: BASE + "/user/products", // GET
    getProductById: BASE + "/user/product/", // GET :product_id
    getProductCategories: BASE + "/user/products/categories", // GET
  },

  // users && products
  userProductsOrders: {
    createProductsOrders: BASE + "/user/order/products/create", // GET
    getProductsOrders: BASE + "/user/order/products/", // GET :user_id
    getProductOrdersById: BASE + "/user/order/products/details/", // GET :id
  },

  // users && products
  adminProductsOrders: {
    getProductsOrders: BASE + "/admin/order/products", // GET
    getProductOrdersById: BASE + "/admin/order/product/", // GET :id
  },

  // Users
  userGroupChats: {
    getUserGroupChats: BASE + "/user/groupchats/", // GET :user_id
    getChats: BASE + "/groupchats", // GET
    getChat: BASE + "/groupchat/", // GET :group_id
    joinChat: BASE + "/groupchat/members/join", // POST :{group_id, user_id}
    getMembers: BASE + "/groupchat/members/", // GET :group_id
    getMessages: BASE + "/groupchat/messages/", // GET :group_id
    sendMessage: BASE + "/groupchat/messages/send", // POST :{group_id, message, sender_id}
    likeMessage: BASE + "/groupchat/messages/like", // for both liking and unliking a message - POST : {message_id, user_id}
  },

  // Users && chats
  userChats: {
    getChats: BASE + "/chats/", // GET :user_id
    getChat: BASE + "/chat", // GET :query - sender_id and receiver_id
    getMessages: BASE + "/chat/messages", // GET :query - sender_id and receiver_id
  },

  // Users && Reviews
  userReviews: {
    createReview: BASE + "/user/review", // POST: userReviewType
    getReviewStat: BASE + "/user/review/stat/", // GET: :category/:id
    listReviews: BASE + "/user/review/list/", // GET: :category/:id
  },

  // Sellers && Reviews
  sellerReviews: {
    respond: BASE + "/seller/review/response",
  },

  // websockets
  websocket: {
    groupchat: WS_BASE + "/ws/group/chat",
    personal: WS_BASE + "/ws/personal/chat",
  },

  landingPages: {
    contactUs: BASE + "/contactus", // POST
  },
};
