import { MongoClient, Db, Collection, MongoClientOptions, Document } from "mongodb";

declare global {
    // eslint-disable-next-line no-var
    var _mongoClientPromise: Promise<MongoClient> | undefined;
}

const uri: string = process.env.MONGO_CONNECTION!;
const options: MongoClientOptions = {};

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === "development") {
    if (!global._mongoClientPromise) {
        client = new MongoClient(uri, options);
        global._mongoClientPromise = client.connect();
    }
    clientPromise = global._mongoClientPromise;
} else {
    client = new MongoClient(uri, options);
    clientPromise = client.connect();
}

export async function getDatabase(): Promise<Db> {
    const client = await clientPromise;

    return client.db();
}

export async function getCollection<T extends Document>(
    collectionName: string
): Promise<Collection<T>> {
    const db = await getDatabase();

    return db.collection<T>(collectionName);
}

export default getDatabase;
