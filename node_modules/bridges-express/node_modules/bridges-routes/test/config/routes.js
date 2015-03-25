
module.exports = function(router, controllers) {

  router.get('/main', controllers.main.index);
}

