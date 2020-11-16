const fs = require('fs')
const path = require('path')
const authentication = require('../../middlewares/authentication')
const { client, getAsync } = require('../../../loaders/redis')
const { roomList } = require('../../../services/room')
const { tenantList } = require('../../../services/tenant')

module.exports = async (app, handlebars) => {

    // Demo
    app.get('/demo', async (req, res) => {
        // Compile template
        const template = await handlebars.compile(fs.readFileSync(path.join(__dirname, '../../../../views/pages/admin/demo.hbs'), 'utf8'));

        // Render template
        const output = template({
            title: 'Demo'
        });

        res.status(200)
            .send(output)
    })

    // Sign up
    app.get('/signup', async (req, res) => {
        // Compile template
        const template = await handlebars.compile(fs.readFileSync(path.join(__dirname, '../../../../views/pages/admin/signup.hbs'), 'utf8'));

        // Render template
        const output = template({
            title: 'Sign up'
        });

        res.status(200)
            .send(output)
    })

    // Log in
    app.get('/', async (req, res) => {
        // Compile template
        const template = await handlebars.compile(fs.readFileSync(path.join(__dirname, '../../../../views/pages/admin/login.hbs'), 'utf8'));

        // Render template
        const output = template({
            title: 'Log in',
            message: req.cookies.message
        });

        res.status(200)
            .send(output)
    })

    // Dashboard
    app.get('/dashboard', authentication, async (req, res) => {
        // Get user in cache
        async () => { client.get('user') }
        const userCache = await getAsync('user')
        const user = JSON.parse(userCache)

        // Get properties in cache
        async () => { client.get('properties') }
        const propertiesCache = await getAsync('properties')
        const properties = JSON.parse(propertiesCache)

        // Compile template
        const template = await handlebars.compile(fs.readFileSync(path.join(__dirname, '../../../../views/pages/admin/dashboard.hbs'), 'utf8'));

        // Render template
        const output = template({
            title: 'Dashboard',
            header: 'Dashboard',
            user,
            properties
        });

        res.status(200)
            .send(output)
    })

    // Property
    app.get('/property/:id', authentication, async (req, res) => {
        // Get user in cache
        async () => { client.get('user') }
        const userCache = await getAsync('user')
        const user = JSON.parse(userCache)

        // Get properties in cache
        async () => { client.get('properties') }
        const propertiesCache = await getAsync('properties')
        const properties = JSON.parse(propertiesCache)

        // Get catalogs in cache
        async () => { client.get('catalogs') }
        const catalogsCache = await getAsync('catalogs')
        const catalogs = JSON.parse(catalogsCache)

        // Find specific property in properties
        const indexOfProperty = properties.findIndex(i => i._id === req.params.id);
        const property = properties[indexOfProperty]

        // Query rooms in specific property
        const { rooms } = await roomList(req.params.id)

        // Query tenants in specific property
        const { tenants } = await tenantList(req.params.id)

        // Compile template
        const template = await handlebars.compile(fs.readFileSync(path.join(__dirname, '../../../../views/pages/admin/property.hbs'), 'utf8'));

        // Render template
        const output = template({
            title: property.name,
            header: 'Property',
            user,
            properties,
            catalogs,
            property,
            rooms,
            tenants
        });

        res.status(200)
            .send(output)
    })

    // Management

    // Property
    app.get('/management/property', authentication, async (req, res) => {
        // Get user in cache
        async () => { client.get('user') }
        const userCache = await getAsync('user')
        const user = JSON.parse(userCache)

        // Get properties in cache
        async () => { client.get('properties') }
        const propertiesCache = await getAsync('properties')
        const properties = JSON.parse(propertiesCache)

        // Compile template
        const template = await handlebars.compile(fs.readFileSync(path.join(__dirname, '../../../../views/pages/admin/management/property.hbs'), 'utf8'));

        // Render template
        const output = template({
            title: 'Property Management',
            header: 'Property Management',
            user,
            properties
        });

        res.status(200)
            .send(output)
    })

    // Catalog
    app.get('/management/catalog', authentication, async (req, res) => {
        // Get user in cache
        async () => { client.get('user') }
        const userCache = await getAsync('user')
        const user = JSON.parse(userCache)

        // Get properties in cache
        async () => { client.get('properties') }
        const propertiesCache = await getAsync('properties')
        const properties = JSON.parse(propertiesCache)

        // Get catalogs in cache
        async () => { client.get('catalogs') }
        const catalogsCache = await getAsync('catalogs')
        const catalogs = JSON.parse(catalogsCache)

        // Compile template
        const template = await handlebars.compile(fs.readFileSync(path.join(__dirname, '../../../../views/pages/admin/management/catalog.hbs'), 'utf8'));

        // Render template
        const output = template({
            title: 'Catalog Management',
            header: 'Catalog Management',
            user,
            properties,
            catalogs
        });

        res.status(200)
            .send(output)
    })

    // Account

    // Edit profile
    app.get('/account/profile', authentication, async (req, res) => {
        // Get user in cache
        async () => { client.get('user') }
        const userCache = await getAsync('user')
        const user = JSON.parse(userCache)

        // Get properties in cache
        async () => { client.get('properties') }
        const propertiesCache = await getAsync('properties')
        const properties = JSON.parse(propertiesCache)

        // Compile template
        const template = await handlebars.compile(fs.readFileSync(path.join(__dirname, '../../../../views/pages/admin/account/profile.hbs'), 'utf8'));

        // Render template
        const output = template({
            title: 'Profile',
            header: 'Profile',
            user,
            properties
        });

        res.status(200)
            .send(output)
    })

    // Change password
    app.get('/account/password', authentication, async (req, res) => {
        // Get user in cache
        async () => { client.get('user') }
        const userCache = await getAsync('user')
        const user = JSON.parse(userCache)

        // Get properties in cache
        async () => { client.get('properties') }
        const propertiesCache = await getAsync('properties')
        const properties = JSON.parse(propertiesCache)

        // Compile template
        const template = await handlebars.compile(fs.readFileSync(path.join(__dirname, '../../../../views/pages/admin/account/password.hbs'), 'utf8'));

        // Render template
        const output = template({
            title: 'Security',
            header: 'Security',
            user,
            properties
        });

        res.status(200)
            .send(output)
    })

    // 404
    app.get('*', async (req, res) => {
        // Compile template
        const template = await handlebars.compile(fs.readFileSync(path.join(__dirname, '../../../../views/pages/admin/404.hbs'), 'utf8'));

        // Render template
        const output = template({
            title: 'Page not found'
        });

        res.status(200)
            .send(output)
    })
}