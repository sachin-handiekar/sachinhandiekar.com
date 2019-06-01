'use strict';
import moment from 'moment'

exports.createPages = require('./gatsby/create-pages');
exports.onCreateNode = require('./gatsby/on-create-node');

exports.rewritePath = (parsedFilePath, metadata) => {
  if (parsedFilePath.ext === "md") {
    return `/${moment(metadata.createdAt).format('YYYY')}/${moment(metadata.createdAt).format('MM')}/${parsedFilePath.name}/`
  }
}