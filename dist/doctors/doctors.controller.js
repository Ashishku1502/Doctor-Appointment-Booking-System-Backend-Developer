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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DoctorsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const doctors_service_1 = require("./doctors.service");
const create_doctor_dto_1 = require("./dto/create-doctor.dto");
const update_doctor_dto_1 = require("./dto/update-doctor.dto");
const filter_doctor_dto_1 = require("./dto/filter-doctor.dto");
const doctor_entity_1 = require("./entities/doctor.entity");
let DoctorsController = class DoctorsController {
    doctorsService;
    constructor(doctorsService) {
        this.doctorsService = doctorsService;
    }
    create(createDoctorDto) {
        return this.doctorsService.create(createDoctorDto);
    }
    findAll(filterDto) {
        return this.doctorsService.findAll(filterDto);
    }
    findOne(id) {
        return this.doctorsService.findOne(id);
    }
    update(id, updateDoctorDto) {
        return this.doctorsService.update(id, updateDoctorDto);
    }
    remove(id) {
        return this.doctorsService.remove(id);
    }
};
exports.DoctorsController = DoctorsController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new doctor' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'The doctor has been successfully created.', type: doctor_entity_1.Doctor }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Bad Request.' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_doctor_dto_1.CreateDoctorDto]),
    __metadata("design:returntype", void 0)
], DoctorsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get all doctors with optional filtering' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Return all doctors.', type: [doctor_entity_1.Doctor] }),
    (0, swagger_1.ApiQuery)({ name: 'specialization', required: false, description: 'Filter by specialization' }),
    (0, swagger_1.ApiQuery)({ name: 'search', required: false, description: 'Search by name' }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [filter_doctor_dto_1.FilterDoctorDto]),
    __metadata("design:returntype", void 0)
], DoctorsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get a doctor by id' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Return the doctor.', type: doctor_entity_1.Doctor }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Doctor not found.' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'The id of the doctor' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], DoctorsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update a doctor' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'The doctor has been successfully updated.', type: doctor_entity_1.Doctor }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Doctor not found.' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'The id of the doctor' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_doctor_dto_1.UpdateDoctorDto]),
    __metadata("design:returntype", void 0)
], DoctorsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete a doctor' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'The doctor has been successfully deleted.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Doctor not found.' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'The id of the doctor' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], DoctorsController.prototype, "remove", null);
exports.DoctorsController = DoctorsController = __decorate([
    (0, swagger_1.ApiTags)('doctors'),
    (0, common_1.Controller)('doctors'),
    __metadata("design:paramtypes", [doctors_service_1.DoctorsService])
], DoctorsController);
//# sourceMappingURL=doctors.controller.js.map