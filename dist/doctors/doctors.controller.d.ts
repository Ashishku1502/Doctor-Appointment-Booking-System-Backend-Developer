import { DoctorsService } from './doctors.service';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';
import { FilterDoctorDto } from './dto/filter-doctor.dto';
import { Doctor } from './entities/doctor.entity';
export declare class DoctorsController {
    private readonly doctorsService;
    constructor(doctorsService: DoctorsService);
    create(createDoctorDto: CreateDoctorDto): Promise<Doctor>;
    findAll(filterDto: FilterDoctorDto): Promise<Doctor[]>;
    findOne(id: string): Promise<Doctor>;
    update(id: string, updateDoctorDto: UpdateDoctorDto): Promise<Doctor>;
    remove(id: string): Promise<void>;
}
