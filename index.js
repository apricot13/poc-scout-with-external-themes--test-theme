import { theme_generic } from "./generic/theme_generic"
import { vars_generic } from "./generic/vars_generic"
import validThemes from "./valid-themes.json"
const valid = validThemes.valid
require("dotenv").config()

/**
 * If for some reason REACT_APP_THEME is undefined we return 'generic' as the default
 * Don't forget that if you make major changes to look in jobs/add-public-files too
 * @returns string
 */
export const getThemeLabel = () => {
  return process.env.hasOwnProperty("REACT_APP_THEME") &&
    valid.find(e => e.label === process.env.REACT_APP_THEME.toLowerCase())
    ? process.env.REACT_APP_THEME.toLowerCase()
    : "generic"
}

/**
 * This was added incase we couldn't support bfis/bod etc on the api side
 *
 * @deprecated
 */
export const getThemeName = () => {
  return process.env.hasOwnProperty("REACT_APP_THEME") &&
    valid.find(e => e.label === process.env.REACT_APP_THEME.toLowerCase())
    ? valid.find(e =>
        e.label === process.env.REACT_APP_THEME.toLowerCase() ? e.name : false
      )
    : "Generic"
}

/**
 * Determine whether or not we show custom taxonomies.
 * We can overwrite it with env vars if we want.
 * @returns
 */
const determineUsePresetTaxonomies = vars => {
  if (process.env.REACT_APP_USE_PRESET_TAXONOMIES === "true") {
    return true
  } else if (process.env.REACT_APP_USE_PRESET_TAXONOMIES === "false") {
    return false
  }

  if (vars.hasOwnProperty("usePresetTaxonomies")) {
    return vars.usePresetTaxonomies
  } else {
    return false
  }
}

/**
 * We get a list of targets from the env vars,
 * format it nicely here
 * if theres no targets return it blank
 */
const formatTargets = () => {
  let targets = []
  if (
    process.env.hasOwnProperty("REACT_APP_TARGETS") &&
    process.env.REACT_APP_TARGETS !== ""
  ) {
    targets = process.env.REACT_APP_TARGETS.split(",")
  }
  return targets
}

/**
 * Ensures we have a standard theme object.
 * @param {*} vars object
 * @param {*} theme_vars object
 * @returns object
 */
const generate_theme = (vars, theme_vars) => {
  return {
    targets: formatTargets(),
    slug: vars.slug,
    title: vars.hasOwnProperty("title") ? vars.title : "",
    contactEmail: vars.hasOwnProperty("contactEmail")
      ? vars.contactEmail
      : false,
    contactPhone: vars.hasOwnProperty("contactPhone")
      ? vars.contactPhone
      : false,
    serviceHomepageUrl: vars.serviceHomepageUrl,
    organisation: vars.hasOwnProperty("organisation") ? vars.organisation : "",
    organisationUrl: vars.organisationUrl,
    tagline: vars.hasOwnProperty("tagline") ? vars.tagline : "",
    beta: vars.hasOwnProperty("beta") ? vars.beta : false,
    headerLogo: vars.headerLogo,
    cookiesDisabledMessage: vars.cookiesDisabledMessage,
    cookieMessage: vars.cookieMessage,
    cookieName: vars.cookieName,
    cookieCallback: vars.hasOwnProperty("cookieCallback")
      ? vars.cookieCallback
      : () => {},
    footerNav: vars.footerNav,
    outpostLoginUrl: process.env.REACT_APP_OUTPOST_LOGIN_URL,
    outpostRegisterUrl: process.env.REACT_APP_OUTPOST_REGISTER_URL,
    feedbackUrl: process.env.REACT_APP_FEEDBACK_URL,
    scoutUrl: process.env.REACT_APP_SCOUT_URL,
    outpostUrl: process.env.REACT_APP_OUTPOST_URL || "",
    mapSwitchSmall: vars.hasOwnProperty("mapSwitchSmall")
      ? vars.mapSwitchSmall
      : true,
    filterOrder: vars.hasOwnProperty("filterOrder") ? vars.filterOrder : [],
    usePresetTaxonomies: determineUsePresetTaxonomies(vars),
    presetTaxonomies: vars.hasOwnProperty("presetTaxonomies")
      ? vars.presetTaxonomies
      : {},
    noLocationIsCountywide: vars.hasOwnProperty("noLocationIsCountywide")
      ? vars.noLocationIsCountywide
      : false,
    serviceCard: {
      countyWideServiceText:
        vars.hasOwnProperty("serviceCard") &&
        vars.serviceCard.hasOwnProperty("countyWideServiceText")
          ? vars.serviceCard.countyWideServiceText
          : "Countywide",
      hideCategories:
        vars.hasOwnProperty("serviceCard") &&
        vars.serviceCard.hasOwnProperty("hideCategories")
          ? vars.serviceCard.hideCategories
          : false,
    },
    styles: {
      link: theme_vars.link,
      linkHover: theme_vars.linkHover,
      linkActive: theme_vars.linkActive,

      linkBackground: theme_vars.linkBackground,

      textBackground: theme_vars.textBackground,

      toggleColor: theme_vars.toggleColor,

      text: theme_vars.text,
      grey: theme_vars.grey,
      pale: theme_vars.pale,
      offwhite: theme_vars.offwhite,
      white: theme_vars.white,

      grey2: theme_vars.grey2,

      cardShadow: theme_vars.cardShadow,

      green: theme_vars.green,
      focus: theme_vars.focus,
      error: theme_vars.error,

      darkGreen: theme_vars.darkGreen,
      darkYellow: theme_vars.darkYellow,

      maxWidth: theme_vars.maxWidth,
      outerSpacing: theme_vars.outerSpacing,
      breakpointS: theme_vars.breakpointS,
      breakpointM: theme_vars.breakpointM,
      breakpointL: theme_vars.breakpointL,

      primary: theme_vars.primary,
      primaryCompanion: theme_vars.primaryCompanion,
      primaryText: theme_vars.primaryText,
      primaryHover: theme_vars.primaryHover,
      primaryHoverText: theme_vars.primaryHoverText,

      logoHeightMobile: theme_vars.hasOwnProperty("logoHeightMobile")
        ? theme_vars.logoHeightMobile
        : "40px",
      logoHeight: theme_vars.hasOwnProperty("logoHeight")
        ? theme_vars.logoHeight
        : "45px",
      logoAreaWidth: theme_vars.hasOwnProperty("logoAreaWidth")
        ? theme_vars.logoAreaWidth
        : "33%",
    },
  }
}


export const theme = generate_theme(vars_generic, theme_generic)
