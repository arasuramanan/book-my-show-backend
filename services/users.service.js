import { client } from '../index.js';


export async function CreateUser(data) {
    return await client.db('bookmyshow').collection('signin/signup').insertOne(data);
}

export async function getUserByName(email,role) {
    return await client.db('bookmyshow').collection('signin/signup').findOne({email:email},{role:role});
}

export async function getUserByEmail(email) {
    return await client.db('bookmyshow').collection('signin/signup').findOne({email:email});
}