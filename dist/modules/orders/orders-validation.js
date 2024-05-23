"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.byEmail = exports.OrderZodSchema = void 0;
const zod_1 = require("zod");
const OrderZodSchema = zod_1.z.object({
    email: zod_1.z.string().email(),
    productId: zod_1.z.string(),
    price: zod_1.z.number(),
    quantity: zod_1.z.number(),
});
exports.OrderZodSchema = OrderZodSchema;
const byEmail = zod_1.z.object({
    email: zod_1.z.string().email().optional(),
});
exports.byEmail = byEmail;
