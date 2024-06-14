import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

const connect = async () => {
    const connectionState = mongoose.connection.readyState;

    if (connectionState === 1) {
        console.log("Already connected to MongoDB");
    } else if (connectionState === 2) {
        console.log("Currently connecting to MongoDB...");
    } else {
        try {
            await mongoose.connect(MONGODB_URI!, {
                dbName: 'next14restapi',
                bufferCommands: true,
            });
            console.log("Successfully connected to MongoDB");
        } catch (error) {
            if (error instanceof Error) {
                console.error("Error connecting to MongoDB:", error.message);
                throw new Error("Error connecting to MongoDB: " + error.message);
            } else {
                console.error("Unknown error:", error);
                throw new Error("Unknown error: " + error);
            }
        }
    }
};

export default connect;
