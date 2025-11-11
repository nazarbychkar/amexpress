"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var prisma_1 = require("../lib/generated/prisma");
var XLSX = require("xlsx");
var prisma = new prisma_1.PrismaClient();
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var workbook, sheetName, worksheet, carsData, _i, carsData_1, data, err_1;
        var _a, _b, _c, _d, _e, _f, _g, _h;
        return __generator(this, function (_j) {
            switch (_j.label) {
                case 0:
                    workbook = XLSX.readFile('cars.xlsx');
                    sheetName = workbook.SheetNames[0];
                    worksheet = workbook.Sheets[sheetName];
                    carsData = XLSX.utils.sheet_to_json(worksheet);
                    console.log("\u0417\u043D\u0430\u0439\u0434\u0435\u043D\u043E ".concat(carsData.length, " \u0440\u044F\u0434\u043A\u0456\u0432 \u0443 Excel"));
                    _i = 0, carsData_1 = carsData;
                    _j.label = 1;
                case 1:
                    if (!(_i < carsData_1.length)) return [3 /*break*/, 6];
                    data = carsData_1[_i];
                    _j.label = 2;
                case 2:
                    _j.trys.push([2, 4, , 5]);
                    // Переконайся, що всі потрібні поля є
                    return [4 /*yield*/, prisma.car.create({
                            data: {
                                tildaUid: String(data.tildaUid),
                                brand: data.brand,
                                sku: data.sku,
                                mark: data.mark,
                                category: data.category,
                                title: data.title,
                                description: (_a = data.description) !== null && _a !== void 0 ? _a : '',
                                text: (_b = data.text) !== null && _b !== void 0 ? _b : '',
                                photo: (_c = data.photo) !== null && _c !== void 0 ? _c : null,
                                price: Number(data.price),
                                quantity: Number((_d = data.quantity) !== null && _d !== void 0 ? _d : 0),
                                priceOld: data.priceOld ? Number(data.priceOld) : null,
                                editions: (_e = data.editions) !== null && _e !== void 0 ? _e : null,
                                modifications: (_f = data.modifications) !== null && _f !== void 0 ? _f : null,
                                externalId: (_g = data.externalId) !== null && _g !== void 0 ? _g : null,
                                parentUid: (_h = data.parentUid) !== null && _h !== void 0 ? _h : null,
                                engineType: data.engineType,
                                engineVolume: Number(data.engineVolume),
                                transmission: data.transmission,
                                driveType: data.driveType,
                                year: Number(data.year),
                                enginePower: Number(data.enginePower),
                                priceUSD: Number(data.priceUSD),
                                countryOfOrigin: data.countryOfOrigin,
                                mileage: Number(data.mileage),
                                weight: Number(data.weight),
                                length: Number(data.length),
                                width: Number(data.width),
                                height: Number(data.height),
                            },
                        })];
                case 3:
                    // Переконайся, що всі потрібні поля є
                    _j.sent();
                    return [3 /*break*/, 5];
                case 4:
                    err_1 = _j.sent();
                    console.error('Помилка при додаванні запису:', err_1);
                    return [3 /*break*/, 5];
                case 5:
                    _i++;
                    return [3 /*break*/, 1];
                case 6:
                    console.log('✅ Імпорт завершено!');
                    return [4 /*yield*/, prisma.$disconnect()];
                case 7:
                    _j.sent();
                    return [2 /*return*/];
            }
        });
    });
}
main().catch(function (e) {
    console.error(e);
    prisma.$disconnect();
});
