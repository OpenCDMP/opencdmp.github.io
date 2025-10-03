---
sidebar_position: 1
description: Configuring the platform's theme and color preferences
---

# Theming
**OpenCDMP** provides customizable themes for each tenant in the application, based on [**Material 3**](https://m3.material.io/) theming options.
You can access these options through the tenant configuration.\
There are 2 user input variables in order to customize a theme: **primary color** and **css overrides**.

## **Primary Color**
**Primary color** is the base with which [Material](https://m3.material.io/) generates the theme that will be applied throughout the application. Note that while the primary color is used to generate the theme, **it will not necessarily be the designated main color in the generated
 theme**. The M3 theme builder will set the primary color to be as close to the user's choice as possible, without compromising on the theme contrast rules. To ensure that any one specific color is used in the theme as is, it needs to be added as a rule in the CSS overrides area.
## **CSS Overrides**
**CSS Overrides** can be added in [JSON](https://www.json.org/json-en.html) format. The accepted variables are based on [**Material theme variables**](https://material.angular.io/guide/system-variables), with a few additions specific to this application.\
CSS overrides are meant to replace certain system variables that are set in place when a material theme is applied.

### **Color values** 
**Color values** can be set using the material ` --md-sys-<token> ` naming convention.
Some commonly used color tokens are the following:

| Name                             | Description                                                     |
| -------------------------------- | -------------------------------------------------------------------------------- |
| --md-sys-surface      | the background color on most surfaces throughout the app, like cards and dialogs.|
| --md-sys-on-surface   | used for icons, text, and other visual elements placed on a surface background.|
| --md-sys-background   | background color of the main area, behind any other element that the user interacts with.|
| --md-sys-on-background  | used for icons, text, and other visual elements placed on the background.|
| --md-sys-primary      | The most common color used by components to participate in the application theme. Also the color associated with [**Plans**](user-guide/plans/index.md). |
| --md-sys-on-primary   | used for icons, text, and other visual elements placed on a primary background           |
| --md-sys-tertiary      | The accent color used by components to participate in the application theme. Also the color associated with [**Descriptions**](user-guide/descriptions/index.md). |
| --md-sys-on-tertiary   | used for icons, text, and other visual elements placed on a tertiary background.|


### **Typography values** 
Similarly to color, **typography values** can be set using the ` --md-sys-<scale>-<size>-<property> ` naming convention.

| Name          | Available values                                                             |
| ------------- | ---------------------------------------------------------------------------- |
| scale         | ` display `, ` headline `, ` title `, ` body `, ` label `|
| size          | ` large `, ` medium `, ` small `                                 |
| property      | ` size `, ` line-height `, ` weight `                            |

Some examples of typography size value uses in the application: 
| Name                           | Common uses                                                              |
| ------------------------------ | ----------------------------------------------------------------------   |
| --sys-body-large-size          | Editor input fields                                                      |
| --sys-body-medium-size         | The base text size for the application                                   |
| --sys-body-small-size          | Hints, tooltips, sidebar menu footer                                     |
| --sys-label-large-size         | Buttons                                                                  |
| --sys-headline-large-size      | Dialog and other main titles                                             |
| --sys-headline-medium-size     | Secondary titles                                                         |
| --sys-headline-small-size      | Sidebar menu items, section titles                                       |


For more information, take a look at the list of [**color tokens**](https://github.com/material-components/material-web/blob/main/tokens/_md-sys-color.scss) and [**typography tokens**](https://github.com/material-components/material-web/blob/main/tokens/_md-sys-typescale.scss).

### OpenCDMP Color Variables
This is a list of the system variables created for **OpenCDMP**. They are a set of color and typography variables that can be overriden the same way as Material variables.

| Name          | Default Value | Description |
| ------------- | ------------- | ------------------ |
| `--link-color`  | `#1E59B1`     | The color used on all links in the application |

## Extra Resources
For ease of use, the [Material Theme Builder](https://material-foundation.github.io/material-theme-builder/) can be used to generate the desired color values.\
Note that currently, OpenCDMP themes are generated in light mode.

---

## See Also

- [Frontend Configuration](index.md) - Main frontend configuration settings
- [Material 3 Design System](https://m3.material.io/) - Material Design documentation
- [Material Color Tokens](https://github.com/material-components/material-web/blob/main/tokens/_md-sys-color.scss) - Complete list of color tokens
- [Material Typography Tokens](https://github.com/material-components/material-web/blob/main/tokens/_md-sys-typescale.scss) - Complete list of typography tokens

---