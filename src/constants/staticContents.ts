//TODO refactoring naming conventions
//TODO READ_ONLY type

export const CLIENT_ROUTE_PATHS = {
  HOME: "/",
  ERROR: "/404",
  RESET_PASSWORD: "/reset",
  LOGIN: "/login",
  REGISTER: "/register",
  PROFILE: "/profile",
  TOPIC: "/topic",
};

export const ERROR_PAGE_CONTENT = {
  ERROR_CODE: "Error 404",
  PAGE_TITLE: "Page not found",
  PAGE_DESCRIPTION: "The page you're looking for doesn't exist.",
  BACK_TO_HOME: "Back to Homepage",
};

export const LOCAL_IMAGE_PATHS = {
  DEFAULT_AVATAR_SRC: "/images/default-avatar.png",
  ERROR_IMAGE: "/images/err.avif",
};

export const LOCAL_IMAGE_ALT = {
  AVATAR: "avatar",
  ERR_ALT: "404",
};

export const BUTTON_TEXT = {
  IMAGE_UPLOAD: "image upload",
  REMOVE_IMAGE: "remove image",
  GOOGLE_LOGIN: "Continue with Google",
  LOGIN: "Log in",
  REGISTER: "register",
  PROFILE: "profile",
  SIGN_IN: "sign in",
  SIGN_OUT: "sign out",
  SEARCH: "Search",
  CHAT_SEND: "Send",
  MAGIC_LINK_SEND_CODE: "Send Code",
  SHARE_TELEGRAM: "share telegram",
  SHARE_WHATSAPP: "share whatsapp",
  SHARE_TWITTER: "share twitter",
  SHARE_FACEBOOK: "share facebook",
  SHARE_REDDIT: "share reddit",
};

export const LABEL_TEXT = {
  EMAIL: "Email",
  PASSWORD: "Password",
  CONFIRM_PASSWORD: "Confirm password",
  USER_NAME: "User name",
  KEYWORDS: "Keywords",
  AUTHOR: "Author",
};

export const LINK_TEXT = {
  REGISTER: "Register",
  LOGIN: "Login",
  LOGO_EKSI: "Ekşi",
  LOGO_YELLOW: "Sözlük",
};

export const META_TEXT = {
  TITLE: "Sözlük",
};

export const LOG_MESSAGES = {
  ERR_SIGN_OUT: "Error signing out:",
  ERR_DURING_SIGN_OUT: "Error during sign-out",
  ERR_SIGN_OUT_FAILED: "Sign-out failed",
  INFO_ENTRY_CREATED: "entry created",
  INFO_ENTRY_UPDATED: "entry updated",
};

export const UI_MESSAGES = {
  EMPTY_CONTENT: "there is nothing",
  DO_NOT_ACCOUNT: "Don't have an account?",
  HAVE_YOU_ACCOUNT: "Already have an account?",
  LOADING: "Loading",
  SETTINGS: "Settings",
  VERIFY_ACCOUNT: "Verify your account",
};

export const SCHEMA_ERROR_MESSAGES = {
  EMAIL_REQUIRED: "Email is required",
  EMAIL_INVALID: "Invalid email address",
  PASSWORD_REQUIRED: "Password is required",
  PASSWORD_MIN_LENGTH: "Password name must contain at least 6 character",
  USER_NAME_REQUIRED: "User name is required",
  USER_NAME_MIN_LENGTH: "User name must contain at least 6 character",
  PASSWORDS_MUST_MATCH: "The passwords did not match",
};
