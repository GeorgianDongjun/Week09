var express = require('express');
var projects = require('./controllers/projects');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

const requireAuth = (req, res, next) => {
  if (req.isAuthenticated()) return next();

  return res.redirect('/login');
};
router.post('*', requireAuth); // Protect ALL POST routes

// Render create form (GET)
// Project new project from un authed users
router.get('/projects/new', requireAuth, (req, res) =>
  res.render('projects/create')
);

// List all Projects (GET)
router.get('/projects', projects.findAllProjects);
// List a specific Project (GET)
router.get('/projects/:id', projects.findProjectById('projects/details'));

// Require auth on every route below this router
router.use(requireAuth);

// Handle create form (POST)
router.post('/projects/new', projects.createNewProject);
// Render edit form (GET)
router.get('/projects/:id/edit', projects.findProjectById('projects/edit'));

// Handle edit form (POST)
router.post('/projects/:id/edit', projects.updateProjectById);
// Delete a Project (GET)
router.get('/projects/:id/delete', projects.deleteProjectById);

module.exports = router;
