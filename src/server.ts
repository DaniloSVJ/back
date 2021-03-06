import "reflect-metadata"
import express, { Request,Response,NextFunction } from "express"
import "express-async-errors";
import routes from './routes';
import './database'
import uploadConfig from './config/upload';
import AppError from "./error/AppErro";
import cors from 'cors'

interface Midl{
    err:Error,
    request:Request,
    response:Response,
    next: NextFunction
}
const app = express()
app.use(cors())
app.use(express.json())
//app.use('/files',express.static(uploadConfig.directory))
app.use(routes)

app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
    if (err instanceof AppError) {
      return response
        .status(err.statusCode)
        .json({ status: 'error', message: err.message });
    }



    return response
      .status(500)
      .json({ status: 'error',  message: err.message });//'Internal server error' });
  });
//routes.use("/appointments",appointmentsRouter)



//app.post('appointments')

app.listen(process.env.PORT || 3000)
