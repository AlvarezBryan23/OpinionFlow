"use strict"

import express from 'express'
import cors from "cors"
import helmet from "helmet"
import morgan from "morgan"
import { dbConnection } from './mongo.js'
import authRoutes from "../src/auth/auth.routes.js"

const middlewares = (app) =>{
    app.use(express.json())
    app.use(cors())
    app.use(helmet())
    app.use(morgan("dev"))
}

const routes = (app) =>{
    app.use("/opinionFlow/v1/auth", authRoutes)
}

const conectarDB = async () =>{
    try{
        await dbConnection()
    }catch(err){
        console.log(`Database connection failed: ${err}`)
    }
}

export const initServer = () =>{
    const app = express()
    try{
        middlewares(app)
        routes(app)
        conectarDB()
        app.listen(process.env.PORT)
        console.log(`Server running on port: ${process.env.PORT}`)
    }catch(err){
        console.log(`Server init failed: ${err}`)
    }
}