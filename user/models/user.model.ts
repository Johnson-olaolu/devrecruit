import mongoose, { Schema, Document } from "mongoose";
import bcrypt from "bcryptjs";

export interface IUser extends Document {
  email: string;
  password: string;
  name?: string;
  createdAt: Date;
  updatedAt: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const userSchema = new Schema<IUser>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

// Hash password before saving
userSchema.pre("save", async function (next) {
  const user = this;

  if (!user.isModified("password")) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    next();
  } catch (error: any) {
    next(error);
  }
});

userSchema.set("toJSON", {
  transform(doc, ret) {
    ret["id"] = ret["_id"];
    delete ret["_id"];
    delete ret["__v"];
    delete ret["password"];
    return ret;
  },
});

userSchema.methods.comparePassword = async function (candidatePassword: string) {
  const ismatch = await bcrypt.compare(candidatePassword, this.password);
  return ismatch;
};

export const User = mongoose.model<IUser>("User", userSchema);
