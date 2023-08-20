const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");
const aggregatePaginate = require("mongoose-aggregate-paginate-v2");
const uniqueValidator = require("mongoose-unique-validator");
const mongooseDelete = require("mongoose-delete"); // Added soft delete plugin
const bcrypt = require("bcrypt");

const myCustomLabels = {
  totalDocs: "itemCount",
  data: "docs",
  limit: "perPage",
  page: "currentPage",
  nextPage: "next",
  prevPage: "prev",
  totalPages: "pageCount",
  pagingCounter: "slNo",
  meta: "paginator",
};

mongoosePaginate.paginate.options = { customLabels: myCustomLabels };

const Schema = mongoose.Schema;

const additionalDataSchema = new Schema({
  field1: String,
  field2: Number,
  field3: Boolean,
});

const schema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      match: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g, // Added email validation
    },
    password: {
      type: String,
      required: true,
      select: false,
      set: function (password) {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);
        return hash;
      },
    },
    fullName: {
      type: String,
    },
    additionalData: additionalDataSchema,
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: {
      createdAt: "createdAt",
      updatedAt: "updatedAt",
    },
  }
);

schema.index({ "$**": "text" });

schema.set("toJSON", {
  transform: function (doc, ret, options) {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
  },
});

schema.plugin(mongoosePaginate);
schema.plugin(aggregatePaginate);
schema.plugin(uniqueValidator, {
  message: "Error, expected {VALUE} to be unique.",
});
schema.plugin(mongooseDelete, { deletedAt: true, overrideMethods: true }); // Added soft delete plugin

const users = mongoose.model("users", schema);
module.exports = users;
