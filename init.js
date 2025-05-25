const mongoose = require("mongoose");
const Chat = require("./models/chats");

main()
    .then(() => console.log(`Database Connected Successfully`))
    .catch((err) => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/chatapp');
}

let allChats = [
    {
        from: 'Aman',
        to: 'Ravi',
        message: 'Hey Ravi, how’s it going?',
        created_at: new Date(),
        updated_at: new Date(),
        _id: new mongoose.Types.ObjectId(),
        __v: 0
    },
    {
        from: 'Arpita',
        to: 'Neha',
        message: 'Let’s catch up later!',
        created_at: new Date(),
        updated_at: new Date(),
        _id: new mongoose.Types.ObjectId(),
        __v: 0
    },
    {
        from: 'Ravi',
        to: 'Aman',
        message: 'Doing good! You?',
        created_at: new Date(),
        updated_at: new Date(),
        _id: new mongoose.Types.ObjectId(),
        __v: 0
    },
    {
        from: 'Neha',
        to: 'Arpita',
        message: 'Sure! Meet at 5 PM?',
        created_at: new Date(),
        updated_at: new Date(),
        _id: new mongoose.Types.ObjectId(),
        __v: 0
    },
    {
        from: 'Aman',
        to: 'Neha',
        message: 'Good morning!',
        created_at: new Date(),
        updated_at: new Date(),
        _id: new mongoose.Types.ObjectId(),
        __v: 0
    }
];

Chat.insertMany(allChats); 