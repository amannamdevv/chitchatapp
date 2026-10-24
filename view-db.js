import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const uri = process.env.MONGO_DB_URI;

async function viewDatabase() {
    console.log('🔄 Connecting to MongoDB...\n');
    try {
        await mongoose.connect(uri);
        console.log('✅ Connected to Database Successfully!\n');

        const db = mongoose.connection.db;

        // 1. Fetch Users
        const users = await db.collection('users').find({}, { projection: { password: 0 } }).toArray();
        console.log(`👤 REGISTERED USERS (${users.length}):`);
        console.log('--------------------------------------------------');
        const userMap = {};
        users.forEach((u, i) => {
            userMap[u._id.toString()] = u.fullName || u.username;
            console.log(`${i + 1}. ${u.fullName} (@${u.username}) | Gender: ${u.gender} | ID: ${u._id}`);
        });

        // 2. Fetch Recent Messages
        const messages = await db.collection('messages').find().sort({ createdAt: -1 }).limit(10).toArray();
        console.log('\n💬 RECENT 10 CHAT MESSAGES:');
        console.log('--------------------------------------------------');
        if (messages.length === 0) {
            console.log('No messages found yet.');
        } else {
            messages.reverse().forEach((msg) => {
                const sender = userMap[msg.senderId?.toString()] || msg.senderId;
                const receiver = userMap[msg.receiverId?.toString()] || msg.receiverId;
                const time = msg.createdAt ? new Date(msg.createdAt).toLocaleTimeString() : 'N/A';
                console.log(`[${time}] ${sender} ➔ ${receiver}: "${msg.message}" (Status: ${msg.status || 'sent'})`);
            });
        }

        // 3. Conversations summary
        const convCount = await db.collection('conversations').countDocuments();
        console.log(`\n📁 Total Conversations: ${convCount}`);
        console.log('--------------------------------------------------\n');

        process.exit(0);
    } catch (err) {
        console.error('❌ Connection Error:', err.message);
        process.exit(1);
    }
}

viewDatabase();
