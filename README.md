# Shopify builder

---

## Usage
**Node.js version 14.0.0 or higher**

## Install

**Global Install:**

* Install using [npm](https://www.npmjs.com/):
```bash
npm install -g @savchukoleksii/builder
```

* Install using [yarn](https://yarnpkg.com/):
```bash
yarn global add @savchukoleksii/builder
```

`Global install using npm is preferable way to install package globally`

**Local Install:**
* Install all dependencies with [yarn](https://yarnpkg.com/)
```bash
yarn add --dev @savchukoleksii/builder
```

* Add and configure your config.yml file. You can copy the example from the file [config.example.yml](./config.example.yml)

```yaml
development:
  password: XXXXXXXXXXXXXX
  theme_id: XXXXXXXXXXXXXX
  store: XXXXXXXXXXXXXX.myshopify.com
  preview_url: XXXXXXXXXXXXXX.shopifypreview.com <= [NOT REQUIRED]
  ignore_files:
    - config/settings_data.json
```

**Note:** You can use multiple environments using different environments names. Example:

```yaml
development:
  password: XXXXXXXXXXXXXX
  theme_id: XXXXXXXXXXXXXX
  store: XXXXXXXXXXXXXX.myshopify.com
  preview_url: XXXXXXXXXXXXXX.shopifypreview.com <= [NOT REQUIRED]
  ignore_files:
    - config/settings_data.json

production:
  password: XXXXXXXXXXXXXX
  theme_id: XXXXXXXXXXXXXX
  store: XXXXXXXXXXXXXX.myshopify.com
  preview_url: XXXXXXXXXXXXXX.shopifypreview.com <= [NOT REQUIRED]
  ignore_files:
    - config/settings_data.json
```

**Note: Some Shopify Apps can be broken on localhost, so you can pass additional "preview_url" param to your enviroment to fix this issue,but you will not be able to use checkout (Shopify Checkout does not work with Shopify Preview links)**

## Basic commands

Basic commands for work with your theme:

`builder build` - Build files

`builder deploy` - Build and deploy files

`builder start` - Build, deploy and watch files

`builder watch` - Watch files

`builder server` - Run Proxy server for the theme

`builder download` - Download theme files

`builder zip` - Archives the project

`builder create [archive]` - Create new project from scratch. You can also pass additional param `archive` - link to zip archive to use your own boilerplate.

Example: `themeplify create https://github.com/savchukoleksii/shopify-starter-theme/archive/refs/heads/main.zip`

## Basic options

| Option   			|      Description      											|  Default Value 	|
|-------------------|:------------------------------------------------------------------|:-----------------:|
| -c, --config 		|  Path to config.yml 												| "config.yml" 		|
| -d, --dir 		|  Directory that command will take effect 							|  					|
| -e, --env 		|  Environment from config file 									| "development" 	|
| -a, --allenvs 	|  Will run this command for each environment in your config file 	| false 			|
| -n, --nodelete 	|  Will run deploy without removing files from shopify 				| false 			|
| --cli 			|  Option for use Shopify CLI 										| false 			|
| --preview 		|  Will run webserver using priview link 							| false 			|
| --nh, --nohooks 	|  Will skip git hooks 												| false 			|
| --help 			|  Show help 														|  					|

## Documentation
It is important!
* [File structure](./docs/file-structure.md)
* [JavaScript](./docs/js.md)
* [CSS](./docs/css.md)
* [Examples of usage](./docs/example-usage.md)
* [Icons](./docs/icons.md)

## Last changes
All recent changes are available here: [changelog](./docs/changelog.md).
Bugs and feature-request here: [issues](/issues).
