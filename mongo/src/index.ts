import express from "express";
import mongoose from "mongoose";
import MobileUsers from "./models";

const app = express();

mongoose
  .connect(
    ""
  )
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));

const DBoperation = async () => {
  //! to find the user and .Select is used to select the fields to be displayed */
  // const user = await MobileUsers
  // .findOne({n: "Krishna"})
  // .select({e: 1, id: -1});

  //!limit is used to limit the number of results and skip is used to skip the number of results
  //? Limit and Skip are generally used together to implement pagination
  // const user = await MobileUsers.find({})
  // .limit(5).skip(1);  skip the first document and then return the next 5 documents

  //* Pagination way use of limit and skip example
  //   const page = 2; // Page number
  //   const pageSize = 5; // Documents per page

  //   db.collection
  //     .find()
  //     .skip((page - 1) * pageSize)
  //     .limit(pageSize);

  //? CountDocuments is used to count the number of documents in the collection based on the query
  //   const count = await MobileUsers.countDocuments({ n: "Krishna" });
  //   console.log(count);

  //   console.log(user);

  //! One of the important mongo concepts which is aggregation
  const result = await MobileUsers.aggregate([
    {
      // STAGE-1 -- Match is used to filter the documents based on the matching condition
      $match: {
        otp: {
          $gte: "155555", //this is greater than or equal to operator
        },
      },
    },
    // STAGE-2 -- Group is used to group the documents based on the field
    {
      $group: {
        _id: {
          year: { $year: "$createdAt" }, //$year and $month operator extracts the year and month from createdAt field
          month: { $month: "$createdAt" },
        },
        avgN: {
          $avg: "$n",  //$avg is used to calculate the average of the field if it is number
        },
        count: { $sum: 1 }, //$sum is used to count the number of documents
      },
    },
    // STAGE-3 -- Project is used to project the fields to be displayed
    {
      $project: {
        avgN : 0,
      }
    }
  ]);
  console.log(result);
};

DBoperation();


//! POPULATE is used to populate the fields from the other collection

// Define the User Schema
const userSchema = new mongoose.Schema({
  name: String,
  email: String
});

// Define the Post Schema with a reference to the User Schema
const postSchema = new mongoose.Schema({
  title: String,
  content: String,
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' } // user references the User storing the id of the user
});

const posts = await Post.find()
.populate('user') // Populate user field
.exec();