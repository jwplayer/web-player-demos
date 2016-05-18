# JW Developer Demos

This repository is for managing the [JW Player Developer Demos](//developer.jwplayer.com/jw-player/demos/). It includes demos and code samples from the JW Player team as well as a Developer Showcase highlighting demos submitted by our developer community.

## Demo Setup

All JW Developer demos can be downloaded and run locally. Build instructions and required components are outlined below.

### Build Instructions

If you don't already have Node.js, please [download and install](//nodejs.org/en/download/) it now.

Then, from the project root directory, `jwdeveloper-demos/`:

1. Install Node modules:

		$ [sudo] npm install

2. Install Bower components:

		$ [sudo] bower install

3. Run Grunt to compile changes:

		$ grunt

4. Run Grunt to compile changes and serve locally:

		$ grunt serve

### Demo Structure

Each demo contains the following elements:

	assets/
	css/
		style.css
	js/
		main.js
	config.json
	index.html

Only `index.html` and `config.json` are required for the build. In a basic setup, `index.html` must contain a single line player embed and `config.json` must include the demo title, description, and license.

Local assets (such as images, .txt files, etc...) referenced within the demo should be saved in the `assets` directory.

We encourage you to use our [Demo Starter Kit](//github.com/jwplayer/jwdeveloper-demos/tree/master/demos/developer-showcase/demo-starter-kit) as the basis for your project.

## Contributing a Demo

Our developer community continues to amaze us with unique implementations of our player. We have created our Developer Showcase to help show off your work to other developers.

### Submissions

Submitting a demo for consideration for the [JW Developer Showcase](//developer.jwplayer.com/jw-player/demos/developer-showcase/) is easy.

1. Fork this repository
2. Duplicate the demo starter kit and build your demo
3. Update your config file (see instructions below)
4. Submit a pull request

Our Developer Relations Manager will review all submissions. Please note that we only publish a few, carefully selected apps on the JW Developer Showcase and that we do not reply to submissions personally.

#### Please note
By submitting you are agreeing to license your demo under the Apache 2.0 license.

### Config File

The `config.json` file provides metadata about your demo. It will be used to populate information about your demo on the page. Only title, description, and license are required to build the demo, but we ask that you complete all fields for Developer Showcase demo submissions.

```
{
  "title": "",
  "description": "",
  "license": "Free|Premium|Ads|Enterprise",
  "showCode": true|false,
  "layout": "horizontal|vertical",
  "apiCalls": [],
  "author": {
  	"name": "",
  	"githubUsername": ""
  }
}
```

Key | Type | Value Description
:--- | :--- | :---
`title` | `string` | Demo title*
`description` | `string` | A brief description of your demo*
`license` | `string` | The license type necessary to recreate your demo*
`showCode` | `boolean` | Displays demo player with code snippet when `true`, without code snippet when `false`
`layout` | `string` | Displays code snippet to right of demo player on `horizontal` or under demo player on `vertical`
`apiCalls` | `array` | List of JW Player Javascript API calls used in your demo. For example: `.on('ready')`
`author.name` | `string` | Your name
`author.githubUsername` | `string` | Your GitHub username

## JW Developer Community

You can [join the JW Developer Community](//developer.jwplayer.com/sign-up/) and follow us on Twitter [@JWDevelopers](//twitter.com/JWDevelopers) to be among the first to know about beta test opportunities, new developer documentation and toolkits, developer community events, and more.
