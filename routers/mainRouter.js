const express = require('express')
const router = express.Router()

router.use(require('./RegisterLogin'))
router.use(require('./index'))
router.use(require('./writer'))
router.use(require('./user'))
router.use(require('./article'))

module.exports = router