import express, { Application } from 'express';
import morgan from "morgan";

// Routes
import IndexRoutes from './routes/index.routes'
import UsersRoutes from './routes/users.routes'
import LoginRoutes from './routes/login.routes'

export class App {

    app: Application;
    
    
    constructor(private port?: number | string){
        this.app = express();
        this.settings();
        this.middlewares();
        this.routes();
    }

    settings() {
        this.app.set('port', this.port || process.env.NODE_PORT || 3000 );
    }

    middlewares() {
        this.app.use( morgan('dev') );
        this.app.use(express.json()) // for parsing application/json
    }

    routes() {
        this.app.use(IndexRoutes);
        this.app.use('/users', UsersRoutes);
        this.app.use('/login', LoginRoutes);
    }

    async listen() {
        this.app.listen(this.app.get('port'));
        console.log('Server on port', this.app.get('port'));
    }

    

}