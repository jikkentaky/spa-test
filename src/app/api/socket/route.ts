import { createServer } from 'http';
import { Server } from 'socket.io';

const startServer = async (port: number): Promise<void> => {
    const httpServer = createServer();

    return new Promise((resolve, reject) => {
        const handleError = (error: NodeJS.ErrnoException) => {
            if (error.code === 'EADDRINUSE') {
                console.log(`Port ${port} is in use, trying ${port + 1}`);
                resolve(startServer(port + 1));
            } else {
                console.error('Failed to start server:', error);
                reject(error);
            }
        };

        httpServer.on('error', handleError);

        httpServer.listen(port, () => {
            const io = new Server(httpServer, {
                path: '/api/socket',
                addTrailingSlash: false,
                cors: {
                    origin: '*',
                    methods: ['GET', 'POST']
                }
            });

            let activeSessions = 0;

            io.on('connection', (socket) => {
                activeSessions++;
                io.emit('activeSessionsUpdate', activeSessions);
                console.log('User connected. Active sessions:', activeSessions);

                socket.on('disconnect', () => {
                    activeSessions--;
                    io.emit('activeSessionsUpdate', activeSessions);
                });
            });

            console.log(`Socket.IO server running on port ${port}`);
            resolve();
        });
    });
};

startServer(Number(process.env.SOCKET_PORT) || 3001).catch((error) => {
    console.error('Failed to start server:', error);
});
