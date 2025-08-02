"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TimeSlot = exports.AvailableSlotsDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class AvailableSlotsDto {
    doctorId;
    date;
}
exports.AvailableSlotsDto = AvailableSlotsDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'The doctor ID' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], AvailableSlotsDto.prototype, "doctorId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'The date to check for available slots (ISO format)' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], AvailableSlotsDto.prototype, "date", void 0);
class TimeSlot {
    startTime;
    endTime;
}
exports.TimeSlot = TimeSlot;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'The start time of the slot' }),
    __metadata("design:type", Date)
], TimeSlot.prototype, "startTime", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'The end time of the slot' }),
    __metadata("design:type", Date)
], TimeSlot.prototype, "endTime", void 0);
//# sourceMappingURL=available-slots.dto.js.map