const express = require("express");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const path = require("path");
const Chat = require("./models/chats");
const ejsMate = require("ejs-mate");
const app = express();
const port = 8080;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));
app.use(methodOverride("_method"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.engine("ejs", ejsMate);

main()
    .then(() => console.log(`Database Connected Successfully`))
    .catch((err) => console.log(err));

async function main() {
    await mongoose.connect(process.env.MONGO_URI);
}

// Index Route
app.get("/chats", async (req, res) => {
    let chats = await Chat.find();
    console.log(chats);
    res.render("index.ejs", { chats });
})

// New Message Route
app.get("/chats/new", (req, res) => {
    res.render(`newChat.ejs`);
})

// Create New Chat Route
app.post("/chats", (req, res) => {
    let { from, to, message } = req.body;
    let newChat = new Chat({
        from: from,
        to: to,
        message: message,
        created_at: new Date(),
        updated_at: new Date()
    });

    newChat.save().
        then((res) => { console.log(res) })
        .catch((err) => { console.log(err) });

    res.redirect("/chats");

});

// Edit Message Route
app.get("/chats/:id/edit", async (req, res) => {
    let { id } = req.params;
    let currChat = await Chat.findById(id);
    res.render(`edit.ejs`, { currChat });
});

// Update the edited the message
app.patch("/chats/:id", async (req, res) => {
    let { id } = req.params;
    let { message: updatedMessage, updated_at } = req.body;
    let updatedChat = await Chat.findByIdAndUpdate(id, { message: updatedMessage, updated_at: new Date() }, { runValidators: true, new: true });

    console.log(updatedChat);
    res.redirect(`/chats`);
});

// Search Chats
app.get('/chats/search', async (req, res) => {
    const { q } = req.query;
    const regex = new RegExp(q, 'i');
    const chats = await Chat.find({
        $or: [
            { from: regex },
            { to: regex },
            { message: regex }
        ]
    });
    res.render('index', { chats });
});

//Delete Route
app.delete("/chats/:id", async (req, res) => {
    let { id } = req.params;
    let deletedChat = await Chat.findByIdAndDelete(id);
    console.log(deletedChat);
    res.redirect(`/chats`);
})

app.get("/", (req, res) => {
    res.redirect(`/chats`);
});


app.listen(port, () => {
    console.log(`Listening to ${port}`);
});