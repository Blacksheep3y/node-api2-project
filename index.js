const express = require("express")
const postRouter = require("./posts/post-router")


const server = express()
const port = 4000

server.use(express.json())
// server.use("/api/posts", postRouter)


server.listen(port, () => console.log(`\n ** Running API on port ${port} ** \n`))
