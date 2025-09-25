import { Injectable, OnModuleInit } from "@nestjs/common";
import mongoose, { Model } from "mongoose";

interface LogDocument {
    level: "info" | "error" | "warn";
    message: string;
    timestamp: Date;
    meta: {
        userId?: string;
        ip?: string;
        method?: string;
        url?: string;
        statusCode?: number;
        responseTimeMs?: number;
    };
}

const logSchema = new mongoose.Schema<LogDocument>({
    level: { type: String, required: true, enum: ["info", "error", "warn"] },
    message: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
    meta: {
        userId: String,
        ip: String,
        method: String,
        url: String,
        statusCode: Number,
        responseTimeMs: Number,
    },
});

@Injectable()
export class LoggingService implements OnModuleInit {
    private logModel: Model<LogDocument>;

    async onModuleInit() {
        const mongoUri = process.env.MONGODB_URI;
        if (!mongoUri) {
            console.warn("MONGODB_URI not set, logging will be disabled");
            return;
        }

        try {
            await mongoose.connect(mongoUri);
            this.logModel = mongoose.model<LogDocument>("Log", logSchema);
            console.log("Connected to MongoDB for logging");
        } catch (error) {
            console.error("Failed to connect to MongoDB for logging:", error);
        }
    }

    async log(level: "info" | "error" | "warn", message: string, meta?: Partial<LogDocument["meta"]>) {
        if (!this.logModel) {
            console.log(`[${level.toUpperCase()}] ${message}`, meta);
            return;
        }

        try {
            await this.logModel.create({
                level,
                message,
                meta: meta || {},
            });
        } catch (error) {
            console.error("Failed to save log to MongoDB:", error);
        }
    }

    async logRequest(
        level: "info" | "error" | "warn",
        message: string,
        requestData: {
            userId?: string;
            ip?: string;
            method?: string;
            url?: string;
            statusCode?: number;
            responseTimeMs?: number;
        }
    ) {
        await this.log(level, message, requestData);
    }
}
