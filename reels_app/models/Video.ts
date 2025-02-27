import mongoose from "mongoose";

export const Video_Dimentions = {
    width: 1080,
    height: 1920
} as const

export interface IVideo {
    title: string;
    description: string;
    url: string;
    thumbnail_url: string;
    controls?: boolean;
    _id?: mongoose.Types.ObjectId;
    transformation?: {
        height: number;
        width: number;
        quality?: number;
    }
    createdAt?: Date;
    updatedAt?: Date;
}

const Schema = mongoose.Schema;

const videoSchema = new Schema<IVideo>({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    },
    thumbnail_url: {
        type: String,
        required: true
    },
    controls: {
        type: Boolean,
        default: true
    },
    transformation: {
        height: {
            type: Number,
            default: Video_Dimentions.height
        },
        width: {
            type: Number,
            default: Video_Dimentions.width
        },
        quality: {
            type: Number,
            default: 100
        }
    }
},
    { timestamps: true }
);

export const Video = mongoose.models?.Video || mongoose.model<IVideo>("Video", videoSchema);