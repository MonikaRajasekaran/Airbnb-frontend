import getConfig from "next/config";
const { publicRuntimeConfig } = getConfig();

export const BASE_URL = () => {
  // if (publicRuntimeConfig.env === "development") {
  //   return "https://s3-backend-l38q.onrender.com";
  // }
  // if (publicRuntimeConfig.env === "qa") {
  //   return "https://s3-backend-l38q.onrender.com";
  // }
  // return "https://s3-backend-l38q.onrender.com";
  // console.log(process.env.NEXT_PUBLIC_API_BASE_URL);
  return process.env.NEXT_PUBLIC_API_BASE_URL;
};

export const APP_URL = () => {
  publicRuntimeConfig.env;
  if (publicRuntimeConfig.env === "development") {
    return "http://localhost:5600";
  }
  if (publicRuntimeConfig.env === "qa") {
    return "http://localhost:5600";
  }
  return "http://localhost:5600";
};

export const RAZOR = () => {
  if (publicRuntimeConfig.env === "development") {
    return "rzp_test_5TkejTnYkeuaJL";
  }
  if (publicRuntimeConfig.env === "qa") {
    return "rzp_test_5TkejTnYkeuaJL";
  }
  return "rzp_live_qctfM2KP4sVO7i";
};

export const APP_CONFIG = {
  name: "Askurdoctor",
};

export const METHOD_TYPES = {
  GET: "GET",
  POST: "POST",
  PATCH: "PATCH",
  DELETE: "DELETE",
};

export const PATHS = {
  AUTH: {
    REGISTER: "/api/v1/auth/register",
    LOGIN: "/api/v1/auth/login",
    VERIFY: "/api/v1/auth/verify",
    FORGOT_PASSWORD: "/api/v1/auth/forgot-password",
    UPDATE_PASSWORD: "/api/v1/auth/update-password",
    RESET_PASSWORD: "/api/v1/auth/reset-password",
    FORCE_UPDATE: "/api/v1/auth/force-reset",
  },
  EMAIL:{
    EMAILTASK:"/api/v1/emailTask",
  },
  CLIENT: {
    CREATE: "/api/v1/client",
    GET: "/api/v1/client?page={id}&limit={value}",
    GETBYID: "/api/v1/client/{clientId}",
    PATCH: "/api/v1/client/{clientId}",
    DELETE: "/api/v1/client/{clientId}",
    SEARCH: "/api/v1/client/search?searchText={text}&page=1&limit={value}",
  },
  DOCUMENT: {
    CREATE: "/api/v1/doctype",
    GET: "/api/v1/doctype?page={id}&limit={value}",
    GETBYID: "/api/v1/doctype/{doctypeId}",
    PATCH: "/api/v1/doctype/{doctypeId}",
    DELETE: "/api/v1/doctype/{doctypeId}",
    SEARCH: "/api/v1/doctype/search?searchText={text}&page=1&limit={value}",
  },
  EMPLOYEE: {
    CREATE: "/api/v1/employee",
    GET: "/api/v1/employee?page={id}&limit={value}",
    GETBYID: "/api/v1/employee/{employeeId}",
    PATCH: "/api/v1/employee/{employeeId}",
    DELETE: "/api/v1/employee/{employeeId}",
    SEARCH: "/api/v1/employee/search?searchText={text}&page=1&limit={value}",
    GETEMPLOYEEBYEMAIL:"/api/v1/employee?email={text}",
  },
  VENDOR: {
    CREATE: "/api/v1/vendor",
    GET: "/api/v1/vendor?page={id}&limit={value}",
    GETBYID: "/api/v1/vendor/{vendorId}",
    PATCH: "/api/v1/vendor/{vendorId}",
    DELETE: "/api/v1/vendor/{vendorId}",
    SEARCH: "/api/v1/vendor/search?searchText={text}&page=1&limit={value}",
  },
  SERVICE: {
    CREATE: "/api/v1/service",
    GET: "/api/v1/service?page={id}&limit={value}",
    GETBYID: "/api/v1/service/{serviceId}",
    PATCH: "/api/v1/service/{serviceId}",
    DELETE: "/api/v1/service/{serviceId}",
    SEARCH: "/api/v1/service/search?searchText={text}&page=1",
  },
  PACKAGE: {
    CREATE: "/api/v1/packages",
    GET: "/api/v1/packages?page={id}&limit={value}",
    GETBYID: "/api/v1/packages/{packageId}",
    PATCH: "/api/v1/packages/{packageId}",
    DELETE: "/api/v1/packages/{packageId}",
    SEARCH: "/api/v1/packages/search?searchText={text}&page=1&limit={value}",
  },
  TAGS: {
    CREATE: "/api/v1/tags",
    GET: "/api/v1/tags?page={id}&limit={value}",
    GETBYID: "/api/v1/tags/{tagId}",
    PATCH: "/api/v1/tags/{tagId}",
    DELETE: "/api/v1/tags/{tagId}",
    SEARCH: "/api/v1/tags/search?searchText={text}&page=1&limit={value}",
  },
  INVOICE: {
    CREATE: "/api/v1/invoice",
    GET: "/api/v1/invoice?page={id}&limit={value}",
    GETBYID: "/api/v1/invoice/{invoiceId}",
    PATCH: "/api/v1/invoice/{invoiceId}",
    DELETE: "/api/v1/invoice/{invoiceId}",
    SEARCH: "/api/v1/invoice/search?searchText={text}&page=1&limit={value}",
    EXPENSE:"/api/v1/invoice/paystatus?clientId={id}&financialYear={year}",
  }, RECEIPT: {
    CREATE: "/api/v1/receipt",
    GET: "/api/v1/receipt?page={id}&limit={value}",
    GETBYID: "/api/v1/receipt/{receiptId}",
    PATCH: "/api/v1/receipt/{receiptId}",
    DELETE: "/api/v1/receipt/{receiptId}",
    SEARCH: "/api/v1/receipt/search?searchText={text}&page=1&limit={value}",
  },
  HOLIDAY:{
    CREATE: "/api/v1/holiday",
    SYNCPOLICY: "/api/v1/holiday/sync",
    GET: "/api/v1/holiday?page={id}&limit={value}",
    GETBYID: "/api/v1/holiday/{holidayListId}",
    PATCH: "/api/v1/holiday/{holidayListId}",
    DELETE: "/api/v1/holiday/{holidayListId}",
    SEARCH: "/api/v1/holiday/search?searchText={text}&page=1&limit={value}",
  },
  LEAVE:{
    CREATE: "/api/v1/leavepolicy",
    SYNCPOLICY: "/api/v1/leavepolicy/sync",
    GET: "/api/v1/leavepolicy?page={id}&limit={value}",
    GETBYID: "/api/v1/leavepolicy/{leavePolicyId}",
    PATCH: "/api/v1/leavepolicy/{leavePolicyId}",
    DELETE: "/api/v1/leavepolicy/{leavePolicyId}",
    SEARCH: "/api/v1/leavepolicy/search?searchText={text}&page=1&limit={value}",
  },
  LEAVETYPE:{
    CREATE: "/api/v1/leavetype",
    GET: "/api/v1/leavetype?page={id}&limit={value}",
    GETBYID: "/api/v1/leavetype/{leaveTypeId}",
    PATCH: "/api/v1/leavetype/{leaveTypeId}",
    DELETE: "/api/v1/leavetype/{leaveTypeId}",
    SEARCH: "/api/v1/leavetype/search?searchText={text}&page=1&limit={value}",
  },
  LEAVEREQUEST:{
    CREATE: "/api/v1/leaverequest/apply", 
    GET: "/api/v1/leaverequest?page={id}&limit={value}",
    GETBYID: "/api/v1/leaverequest/{leaveRequestId}",
    PATCH: "/api/v1/leaverequest/{leaveRequestId}",
    DELETE: "/api/v1/leaverequest/{leaveRequestId}",
    SEARCH: "/api/v1/leaverequest/search?searchText={text}&page=1&limit={value}",
  },
   LEAVEALLOCATION:{
    CREATE: "/api/v1/leaveallocated",
    GET: "/api/v1/leaveallocated",
    GETBYID: "/api/v1/leaveallocated/{leaveAllocatedId}",
    PATCH: "/api/v1/leaveallocated/{leaveAllocatedId}",
    DELETE: "/api/v1/leaveallocated/{leaveAllocatedId}",
    SEARCH: "/api/v1/leaveallocated/search?searchText={text}&page=1&limit={value}",
  },
  TASK: {
    CREATE: "/api/v1/task",
    GET: "/api/v1/task?page={id}&limit={value}",
    GETBYID: "/api/v1/task/{taskId}",
    PATCH: "/api/v1/task/{taskId}",
    UPDATETASKSTATUS: "/api/v1/task/updatestatus/{taskId}",
    DELETE: "/api/v1/task/{taskId}",
    SEARCH: "/api/v1/task/search?searchText={text}&page=1&limit={value}",
    GETTASKBYINVOICE: "/api/v1/task",
    GETRECENT: "/api/v1/task/recent?page={id}&limit={value}",

  },
  QUOTATION:{
    CREATE: "/api/v1/quotation",
    GET: "/api/v1/quotation?page={id}&limit={value}",
    GETBYID: "/api/v1/quotation/{quotationId}",
    PATCH: "/api/v1/quotation/{quotationId}",
    DELETE: "/api/v1/quotation/{quotationId}",
    SEARCH: "/api/v1/quotation/search?searchText={text}&page=1&limit={value}",
  },
  EXPENSE:{
    CREATE: "/api/v1/expense",
    GET: "/api/v1/expense?page={id}&limit={value}",
    GETBYID: "/api/v1/expense/{expenseId}",
    PATCH: "/api/v1/expense/{expenseId}",
    DELETE: "/api/v1/expense/{expenseId}",
    SEARCH: "/api/v1/expense/search?searchText={text}&page=1&limit={value}",
  },
  DSCTOKEN:{
    CREATE: "/api/v1/dsc",
    GET: "/api/v1/dsc?page={id}&limit={value}",
    GETBYID: "/api/v1/dsc/{tokenId}",
    PATCH: "/api/v1/dsc/{tokenId}",
    DELETE: "/api/v1/dsc/{tokenId}",
    SEARCH: "/api/v1/dsc/search?searchText={text}&page=1&limit={value}",
  },
  CATEGORY:{
    CREATE: "/api/v1/categories",
    GET: "/api/v1/categories?page={id}&limit={value}",
    GETBYID: "/api/v1/categories/{categoriesId}",
    PATCH: "/api/v1/categories/{categoriesId}",
    DELETE: "/api/v1/categories/{categoriesId}",
    SEARCH: "/api/v1/categories/search?searchText={text}&page=1&limit={value}",
    GETSERVICESBYCATEGORY:"/api/v1/categories/service",
  },
  ANALYTICS:{
    CREATE: "/api/v1/analytics",
    GET: "/api/v1/analytics",
    // GET: "/api/v1/analytics?branchId={branchId}",
    BIRTHDAY:"/api/v1/analytics/birthday",
    GETBYID: "/api/v1/analytics/{analyticsId}",
    PATCH: "/api/v1/analytics/{analyticsId}",
    DELETE: "/api/v1/analytics/{analyticsId}",
    SEARCH: "/api/v1/analytics/search?searchText={text}&page=1&limit={value}",
  },
  IMAGE: {
    GALLERY: "/api/v1/gallery",
    CREATE_RESOURCE: "/api/v1/resources/",
    CREATE_PDF_RESOURCE: "/api/v1/resources/pdf",
  },
  PROFILE: {
    CREATE: "/api/v1/profile",
    GET: "/api/v1/profile",
    IMAGE: "/api/v1/profile/image",
    GETALL: "/api/v1/profile/detail?page={id}&limit={value}",
    PATCH: "/api/v1/profile/{profileId}",
  },
  CONTACT: {
    GETALL: "/api/v1/contact?page={id}&limit={value}",
    DELETE: "/api/v1/contact/{contactId}",
  },
  ORG: {
    MY_ORG: "/api/v1/organisation/mine",
    CREATE: "/api/v1/organisation",
  },
  CUSTOMER: {
    GET: "/api/v1/customers",
    CREATE: "/api/v1/customers",
    PATCH: "/api/v1/customers/{customerId}",
    DELETE: "/api/v1/customers/{customerId}",
  },
  RESOURCE: {
    CREATE: "/api/v1/resources",
    GETBYID: "/api/v1/resources/{consumerId}?page={page}&limit={value}",
  },
  PAYMENT: {
    SUBSCRIPTION: "/api/v1/payment/subscription",
    SESSION: "/api/v1/payments/razor/order",
    COMPLETION: "/api/v1/payments/razor/completion",
    TXN: "/api/v1/payments/transactions",
    LEDGER: "/api/v1/ledgers/transactions",
    LEDGER_BY_ID: "/api/v1/ledgers/transactions/{id}",
    WITHDRAWAL: "/api/v1/ledgers/withdraw",
    WITHDRAWAL_APPROVE: "/api/v1/ledgers/withdraw/{id}",
  },
  ATTENDANCE: {
    GET_ATTENDANCE: "/api/v1/attendance",
    CREATE: "/api/v1/attendance",
  },
  OFFICE: {
    GET:"/api/v1/office",
    CREATE:"/api/v1/office",
    GETDEFAULT:"/api/v1/office/default"
  },
  CONFIG: {
    GET: "/api/v1/configuration",
    CREATE: "/api/v1/configuration",
    PATCH: "/api/v1/configuration/{configId}",
    DELETE: "/api/v1/configuration/{configId}",
    SEARCH: "/api/v1/configuration/search?searchText={text}&page=1&limit={value}",
  },
  AUTHCHECK: {
    GET: "/api/v1/authcheck",
    APPROVE: "/api/v1/authcheck/current",
    CREATE: "/api/v1/authcheck",
    GETBYID:"/api/v1/authcheck/status/{authCheckId}",
    PATCH: "/api/v1/authcheck/{authCheckId}",
    DELETE: "/api/v1/authcheck/{authCheckId}",
        SEARCH: "/api/v1/authcheck/search?searchText={text}&page=1&limit={value}",
    },
    PAYSLIP:{
        GET: "/api/v1/payslip",
        CREATE: "/api/v1/payslip",
        GETBYID: "/api/v1/payslip/{payslipId}",
        PATCH: "/api/v1/payslip/{payslipId}",
        DELETE: "/api/v1/payslip/{payslipId}",
        SEARCH: "/api/v1/payslip/search?searchText={text}&page=1&limit={value}",
    }
};

export const ROLES = {
  INFLUENCER: "INFLUENCERS",
  BRAND: "BRAND_MANAGERS",
};
