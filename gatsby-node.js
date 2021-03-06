/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it

exports.onCreateWebpackConfig = require('./gatsby/onCreateWebpackConfig')
exports.onCreateNode = require('./gatsby/onCreateNode')
exports.createPages = require('./gatsby/createPages')

const express = require('express')

exports.onCreateDevServer = ({ app }) => {
  app.use(express.static('public'))
}
