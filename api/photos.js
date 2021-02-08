const { createOSSFileReqHandler } = require('../3_rd_party_utils');
const { ALI_OSS } = require('../const');
module.exports = createOSSFileReqHandler(ALI_OSS.IMG_DIR);
