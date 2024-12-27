import mongoose from 'mongoose';
import e from 'express';
import bodyParser from "body-parser"
import { User, Food } from './Schemas.js';
import cors from "cors"
import fs from "fs"
import path from 'path';
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = e();
const PORT = 3000;
const TOKENLENGTH = 10;
let userToken = '';

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors({ origin: "http://localhost:5173" }))

mongoose.connect('mongodb://localhost:27017/goMeal').then(() => {
    console.log('Connected to MongoDB');
}).catch(err => {
    console.error('Connection failed', err);
});

const generateToken = async () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let token = '';
    for (let i = 0; i < TOKENLENGTH; i++) {
        token += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return token;
};

const validateToken = (req, res, next) => {
    const token = req.headers['authorization'];
    console.log(token)

    if (!token) {
        return res.status(401).send({ message: "Authorization token is required." });
    }

    const filePath = path.join(__dirname, 'users.json');
    try {
        const fileContent = fs.readFileSync(filePath, 'utf8');
        const usersData = JSON.parse(fileContent);
        const user = usersData.users.find(u => u.token === token);

        if (!user) {
            return res.status(401).send({ message: "Invalid or expired token." });
        }

        req.user = user;
        next();
    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
};

app.post("/signup", async (req, res) => {
    const { name, password, info } = req.body;
    const filePath = path.join(__dirname, 'users.json');
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const usersData = JSON.parse(fileContent);

    if (!name || !password) {
        return res.status(400).send({ error: "Name and password are required for signup." });
    }

    try {

        const existingUser = usersData.users.find(u => u.name === name);
        if (existingUser) {
            return res.status(400).send({ error: "User already exists!" });
        }
        const newUser = new User(info);

        await newUser.save();

        const calcedToken = await generateToken()
        usersData.users.push({ name, password, token: calcedToken });
        fs.writeFileSync(filePath, JSON.stringify(usersData, null, 2));

        return res.status(201).send({ message: "User registered successfully!", token: calcedToken });
    } catch (error) {
        console.log(error)
        return res.status(500).send({ error: error.message });
    }
});

app.post("/login", async (req, res) => {
    const filePath = path.join(__dirname, 'users.json');
    if (!req.body.name || !req.body.password) {
        return res.status(400).send({ message: "Name and password are required for login." });
    }

    try {
        const fileContent = fs.readFileSync(filePath, 'utf8');
        const usersData = JSON.parse(fileContent);
        const user = usersData.users.find(u => u.name === req.body.name);

        if (!user) {
            return res.status(404).send({ message: "User does not exist!" });
        }

        if (user.password !== req.body.password) {
            return res.status(401).send({ message: "Invalid password!" });
        }

        const userToken = await generateToken();
        user.token = userToken;

        fs.writeFileSync(filePath, JSON.stringify(usersData, null, 2));

        return res.status(201).send({ token: userToken });
    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
});

app.get("/logout", (req, res) => {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(401).send({ message: "You must login first" });
    }

    try {
        const filePath = path.join(__dirname, 'users.json');
        const fileContent = fs.readFileSync(filePath, 'utf8');
        let usersData;
        try {
            usersData = JSON.parse(fileContent);
        } catch (error) {
            return res.status(500).send({ error: "Error parsing JSON data" });
        }

        const user = usersData.users.find(u => u.token === token);

        if (!user) {
            return res.status(401).send({ message: "Invalid token" });
        }

        user.token = '';
        fs.writeFileSync(filePath, JSON.stringify(usersData, null, 2));

        return res.status(201).send({ message: "Logged out successfully" });
    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
});

app.get("/category", (req, res) => {
    const filePath = path.join(__dirname, "category.json");

    fs.readFile(filePath, "utf8", (err, data) => {
        if (err) {
            res.status(500).json({ error: "Internal Server Error" });
            return;
        }

        res.status(200).json(JSON.parse(data));
    });
})

app.get('/recent', validateToken, async (req, res) => {
    try {
        console.log(req.query)
        const user = await User.findOne({ name: req.query.name });
        if (!user) {
            return res.status(404).send({ error: "user does not exist!" })
        }
        console.log(user)
        return res.status(201).send({ recent: user.recentOrder });
    } catch (err) {
        console.log(err.message)
        return res.status(500).send({ error: err.message });
    }
});

app.get("/food", (req, res) => {
    const filePath = path.join(__dirname, "food.json");

    fs.readFile(filePath, "utf8", (err, data) => {
        if (err) {
            res.status(500).json({ error: "Internal Server Error" });
            return;
        }

        res.status(200).json(JSON.parse(data));
    });
})

app.get("/coupon", (req, res) => {
    const filePath = path.join(__dirname, "coupon.json");
    const couponName = req.query.coupon;

    fs.readFile(filePath, "utf-8", (err, data) => {
        if (err) {
            return res.status(500).json({ error: "Internal Server Error" });
        }

        const calcedData = JSON.parse(data);
        if (calcedData.codes[couponName]) {
            return res.status(200).json({ percentage: calcedData.codes[couponName] });
        }
        return res.status(401).json({ message: "This coupon does not exist" });
    });
});


app.get('/users', validateToken, async (req, res) => {
    try {
        console.log(req.query)
        const user = await User.findOne({ name: req.query.name });
        if (!user) {
            return res.status(404).send({ error: "user does not exist!" })
        }
        return res.status(201).send({ user });
    } catch (err) {
        console.log(err.message)
        return res.status(500).send({ error: err.message });
    }
});
app.post('/users', async (req, res) => {
    if (!req.body.name) {
        return res.status(400).send({ error: "Name is required for login." });
    }
    const isUserExists = await User.findOne({ name: req.body.name })
    if (isUserExists) {
        return res.status(400).send({ error: "user with this name already exists" })
    }
    try {
        const user = new User(req.body);
        await user.save();
        return res.status(201).send(user);
    } catch (err) {
        return res.status(400).send({ error: err.message });
    }
});

app.put("/balance", validateToken, async (req, res) => {
    try {
        const user = await User.findOne({ name: req.body.name })
        if (!user) {
            return res.status(404).send({ error: "user does not exist!" })
        }
        const result = await User.updateOne({ name: req.body.name }, { balance: req.body.balance })
        return res.status(201).send(result)
    } catch (error) {
        return res.status(500).send({ error: err.message })
    }
})

app.put("/address", validateToken, async (req, res) => {
    const { name, address, addressDetail } = req.body
    try {
        const user = await User.findOne({ name })
        if (!user) {
            return res.status(404).send({ error: "user does not exist!" })
        }
        const result = await User.updateOne({ name }, { address, addressDetail })
        console.log(result)
        return res.status(201).send(result)
    } catch (error) {
        return res.status(500).send({ error: err.message })
    }
})



app.get("/favorite", validateToken, async (req, res) => {
    if (!req.body.name) {
        return res.status(400).send({ error: "Name is required for login." });
    }
    try {
        const user = await User.findOne({ name: req.body.name })
        if (!user) {
            return res.status(404).send({ error: "user does not exist!" })
        }
        return res.status(201).send({ favorite: user.favorite })
    } catch (error) {
        return res.status(500).send({ error: err.message })
    }
})
app.put("/favorite", validateToken, async (req, res) => {
    if (!req.body.name) {
        return res.status(400).send({ error: "Name is required for login." });
    }
    const { name, favorite } = req.body
    try {
        const user = await User.findOne({ name })
        if (!user) {
            return res.status(404).send({ error: "user does not exist!" })
        }
        const result = await User.updateOne({ name }, { favorite })
        return res.status(201).send(result)
    } catch (error) {
        return res.status(500).send({ error: err.message })
    }
})


app.put("/recent", validateToken, async (req, res) => {
    const { name, recentOrder } = req.body;

    if (!name || !recentOrder) {
        return res.status(400).send({ error: "Name and recentOrder are required." });
    }

    try {
        const user = await User.findOne({ name });
        if (!user) {
            return res.status(404).send({ error: "User does not exist!" });
        }

        const result = await User.updateOne(
            { name },
            {
                $push: {
                    recentOrder: {
                        $each: [...recentOrder],
                        $slice: -6
                    }
                }
            }
        );

        return res.status(200).send(result);
    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
});


app.put("/premium", validateToken, async (req, res) => {
    console.log(req.body)
    if (!req.body.name) {
        return res.status(400).send({ message: "Name is required" })
    }
    try {
        const name = req.body.name
        console.log(name)
        const user = await User.findOne({ name })
        if (!user) {
            return res.status(400).send({ message: "user doesnot exists" })
        }
        if (user.isPremium) {
            return res.status(401).send({ message: "user already has premium" })
        }
        const result = await User.updateOne({ name }, { isPremium: true })
        console.log(result)
        return res.status(201).send(result)
    } catch {
        return res.status(500).send({ message: err.message })
    }
})

app.post("/checkout", validateToken, (req, res) => {
    const filePath = path.join(__dirname, "orders.json");
    const { username, order } = req.body;

    if (!username || !order) {
        return res.status(400).json({ message: "Invalid input data" });
    }

    let orders;
    try {
        if (!fs.existsSync(filePath)) {
            fs.writeFileSync(filePath, JSON.stringify({}));
        }
        const fileData = fs.readFileSync(filePath, "utf-8");
        orders = JSON.parse(fileData);
    } catch (err) {
        return res.status(500).json({ message: "Error reading the file", error: err.message });
    }

    if (orders[username]) {
        orders[username].push(order);
    } else {
        orders[username] = [order];
    }

    try {
        fs.writeFileSync(filePath, JSON.stringify(orders, null, 2), "utf-8");
    } catch (err) {
        return res.status(500).json({ message: "Error writing to the file", error: err.message });
    }

    res.status(200).json({ isSuccess: true });
});

app.put("/message", (req, res) => {
    const filePath = path.join(__dirname, "message.json");
    const newMessage = req.body;
    console.log(newMessage)

    if (!newMessage || Object.keys(newMessage).length === 0) {
        return res.status(400).send({ error: "Request body is empty or invalid." });
    }
    try {
        const fileContent = fs.readFileSync(filePath, "utf8");
        const jsonData = JSON.parse(fileContent);

        if (!Array.isArray(jsonData.message)) {
            jsonData.message = [];
        }

        jsonData.message.push(newMessage);

        fs.writeFileSync(filePath, JSON.stringify(jsonData, null, 2));

        res.status(200).send({ message: "Message added successfully!" });
    } catch (error) {
        console.error("Error updating the file:", error);
        res.status(500).send({ error: "Failed to update the JSON file." });
    }
});




app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});