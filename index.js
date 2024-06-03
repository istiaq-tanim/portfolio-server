const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const { MongoClient, ObjectId } = require('mongodb');
require('dotenv').config();
const jwt = require('jsonwebtoken');

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection URL
const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run() {
    try {
        // Connect to MongoDB
        await client.connect();
        console.log("Connected to MongoDB");

        const db = client.db('portfolio');
        const projectCollection = db.collection('projects');
        const skillCollection = db.collection('skills');
        const blogCollection = db.collection('blogs');

        app.get("/projects", async (req, res) => {
            const response = await projectCollection.find().toArray()

            res.status(201).json({
                success: true,
                message: 'Projects Retrieved successfully',
                response
            });
        })

        app.get("/projects/:id", async (req, res) => {
            const id = req.params
            const project = { _id: new ObjectId(id) }
            const response = await projectCollection.findOne(project)

            res.status(201).json({
                success: true,
                message: 'Project Retrieved successfully',
                response
            });

        })

        app.post("/projects", async (req, res) => {
            const projects = req.body;
            await projectCollection.insertOne(projects)
            res.status(201).json({
                success: true,
                message: 'Project Posted successfully'
            });
        })

        app.get("/skills", async (req, res) => {
            const response = await skillCollection.find().toArray()

            res.status(201).json({
                success: true,
                message: 'Skills Retrieved successfully',
                response
            });
        })

        app.post("/skills", async (req, res) => {
            const skills = req.body;
            await skillCollection.insertOne(skills)
            res.status(201).json({
                success: true,
                message: 'Skill Posted successfully'
            });
        })

        app.get("/blogs", async (req, res) => {
            const response = await blogCollection.find().toArray()

            res.status(201).json({
                success: true,
                message: 'Blogs Retrieved successfully',
                response
            });
        })

        app.post("/blogs", async (req, res) => {
            const blogs = req.body;
            await blogCollection.insertOne(blogs)
            res.status(201).json({
                success: true,
                message: 'Blog Posted successfully'
            });
        })


        // Start the server
        app.listen(port, () => {
            console.log(`Server is running on http://localhost:${port}`);
        });

    } finally {
    }
}

run().catch(console.dir);


app.get('/', (req, res) => {
    const serverStatus = {
        message: 'Server is running smoothly',
        timestamp: new Date()
    };
    res.json(serverStatus);
});