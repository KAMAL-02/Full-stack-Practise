import express from 'express';
import mongoose from 'mongoose';
import Clients from './models';

const app = express();

mongoose.connect('')
.then(()=>console.log('Connected to MongoDB'))
.catch((err)=>console.log(err))

    const DBoperation = async () => {
        const user = await Clients
        .findOne({n: 'Krishna'})
        .select('n');

        console.log(user);

        const user2 = await Clients.find({n: 'Shraddha'}, {n: 1, e: 1});
        console.log(user2);
    };

DBoperation();