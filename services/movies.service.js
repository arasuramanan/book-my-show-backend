import { client } from '../index.js';

export async function addMoviesbyId(data) {
    return await client.db('bookmyshow').collection('movies').insertOne(data);
}

export async function updateMoviesbyId(id, data) {
    return await client.db('bookmyshow').collection('movies').updateOne({ id: id }, { $set: data });
}

export async function getMoviesbyId(id) {
    return await client.db('bookmyshow').collection('movies').findOne({ id: id });
}

export async function DeleteMovies(id) {
    return await client
        .db("bookmyshow")
        .collection("movies")
        .deleteOne({ id: id });
}

export async function getMovies() {
    return await client.db('bookmyshow').collection('movies').find().toArray();
}
