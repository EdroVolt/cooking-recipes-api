import { Server } from './core/customServer';
import { CorsMiddleware } from './core/middleware/cors.middleware';
import { ErrorMiddleware } from './core/middleware/error.middleware';
import { BodyParserMiddleware } from './core/middleware/bodyParser.middleware';
import { MoragnMiddleware } from './core/middleware/morgan.middleware';
import { ImageUploaderMiddleware } from './core/middleware/imageUploader.middleware';

// -------------- server init ---------------
const app = new Server();
const PORT = parseInt(process.env.PORT as string);
app.listen(PORT || 8080);

// -------------- MWs -----------------------
app.middleware(new CorsMiddleware());
app.middleware(new ImageUploaderMiddleware());
app.middleware(new BodyParserMiddleware());
app.middleware(new MoragnMiddleware());

// -------------- Routers -------------------

// -------------- Err MW --------------------
app.errorMiddleware(new ErrorMiddleware());
