"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = aiActions;
async function aiActions({ name, parameters, meta }) {
    console.log("AI Action called:", name);
    console.log("Parameters and metadata:", parameters, meta);
    switch (name) {
        case "set_nickname": {
            const { nickname } = parameters;
            try {
                console.log("Setting nickname:", nickname);
                return { success: true, nickname };
            }
            catch (e) {
                return {
                    error: e.message || e.to,
                };
            }
        }
        case "say_nickname": {
            console.log("Say nickname command called");
            return { success: true };
        }
        default: {
            break;
        }
    }
}
