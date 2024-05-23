"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchQuerySchema = exports.ProductSchema = void 0;
const zod_1 = require("zod");
const VariantsSchema = zod_1.z.object({
    type: zod_1.z.string(),
    value: zod_1.z.string(),
});
const InventorySchema = zod_1.z.object({
    quantity: zod_1.z.number(),
    inStock: zod_1.z.boolean(),
});
const ProductSchema = zod_1.z.object({
    name: zod_1.z.string(),
    description: zod_1.z.string(),
    price: zod_1.z.number(),
    category: zod_1.z.string(),
    tags: zod_1.z.array(zod_1.z.string()),
    variants: zod_1.z.array(VariantsSchema),
    inventory: InventorySchema,
});
exports.ProductSchema = ProductSchema;
const searchQuerySchema = zod_1.z.object({
    searchTerm: zod_1.z.string().optional(),
});
exports.searchQuerySchema = searchQuerySchema;
