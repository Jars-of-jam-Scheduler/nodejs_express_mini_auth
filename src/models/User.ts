import mongoose, { Schema, Model } from 'mongoose';

interface IUser {
    username: string;
    passwordHash: string;
    roles: string[];
    permissions: string[];
}

interface UserModel extends Model<IUser> {
    findByUsername(username: string): Promise<IUser | null>;
}

const userSchema = new Schema<IUser, UserModel>({
    username: { type: String, required: true, unique: true },
    passwordHash: { type: String, required: true },
    roles: [{ type: String }],
    permissions: [{ type: String }]
});

userSchema.static('findByUsername', function findByUsername(username: string) {
    return this.findOne({ username: username });
})

const User = mongoose.model<IUser, UserModel>('User', userSchema);

export { User };