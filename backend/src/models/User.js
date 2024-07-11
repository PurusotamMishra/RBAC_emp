const { model, Schema } = require("mongoose");

const userSchema = new Schema({
  id: {type: String , unique: true},
  firstName: { type: String },
  lastName: { type: String, default: null },
  email: { type: String, unique: true },
  phone: {type: String},
  role: { type: String, default: "EMP" },
  salary: { type: Number},
  department: { type: String},
  isActive: {type: Boolean, default: "True"},
});
// const { model, Schema } = require("mongoose");   

const roles = new Schema({
    name: { type: String, unique: true },
})

const permissions = new Schema({
    permission: { type: String, unique: true },
})

const hasPermissions = new Schema({
    role: { type: String, unique: true },
    permissions: { type: [String], default: ["NO_ACCESS"] }
})

module.exports.Role = model("Role", roles);
module.exports.Permission = model("Permission", permissions);
module.exports.hasPermissions = model("HasPermission", hasPermissions);
module.exports.User = model("Emp", userSchema);