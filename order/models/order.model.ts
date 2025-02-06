import mongoose, { Schema, Document } from "mongoose";
import { IUser } from "../../user/models/user.model";

export interface IOrder extends Document {
  user: IUser;
  totalAmount: number;
  items?: { product: string; price: number }[];
  status: "pending" | "completed" | "canceled";
  createdAt: Date;
  updatedAt: Date;
}

const orderSchema = new Schema<IOrder>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    totalAmount: {
      type: Number,
      required: true,
    },
    items: [
      {
        product: {
          type: String,
          required: true,
        },
        price: {
          type: Number,
          required: true,
        },
      },
    ],
    status: {
      type: String,
      enum: ["pending", "completed", "canceled"],
      default: "pending",
    },
  },
  { timestamps: true }
);

orderSchema.index({ status: 1, createdAt: 1 }, { unique: true });

orderSchema.set("toJSON", {
  transform(doc, ret) {
    ret["id"] = ret["_id"];
    delete ret["_id"];
    delete ret["__v"];
    return ret;
  },
});

export const Order = mongoose.model<IOrder>("Order", orderSchema);
