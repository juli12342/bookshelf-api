import Hapi from '@hapi/hapi';
import routes from './routes.js';

const init = async () => {
    const server = Hapi.server({
        port: 9000,
        host: 'localhost',
        routes: {
            cors: {
                origin: ['*'],
            },
        },
    });

    // Menambahkan route default
    server.route({
        method: 'GET',
        path: '/',
        handler: () => ({
            status: 'success',
            message: 'Bookshelf API is running...',
        }),
    });

    // Menambahkan routes dari routes.js
    server.route(routes);

    await server.start();
    console.log(`Server berjalan pada ${server.info.uri}`);
};

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});

init();