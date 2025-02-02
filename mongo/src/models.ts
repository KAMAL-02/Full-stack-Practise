import mongoose from "mongoose";


const ClientSchema = new mongoose.Schema(
  {
    users: [{ type: mongoose.Schema.Types.ObjectId }],
    devices: [{ type: mongoose.Schema.Types.ObjectId}],
    n: {
      type: String,
      require: true,
    },
    e: {
      type: String,
      unique: true,
      require: true,
    },
    m: {
      type: String,
      unique: true,
      require: true,
    },
    addr: {
      type: String,
    },
    pin: {
      type: String,
    },
    city: {
      type: String,
    },
    state: {
      type: String,
    },
    country: {
      type: String,
    },
    password: {
      type: String,
    },
  },
  { timestamps: true },
);

let Clients = mongoose.model("clients", ClientSchema);

// module.exports = {
//   clients: Clients,
// };

export default Clients;
