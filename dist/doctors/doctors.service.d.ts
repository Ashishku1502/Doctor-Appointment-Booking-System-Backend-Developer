import { Repository } from 'typeorm';
import { Doctor } from './entities/doctor.entity';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';
import { FilterDoctorDto } from './dto/filter-doctor.dto';
export declare class DoctorsService {
    private doctorsRepository;
    constructor(doctorsRepository: Repository<Doctor>);
    create(createDoctorDto: CreateDoctorDto): Promise<Doctor>;
    findAll(filterDto?: FilterDoctorDto): Promise<Doctor[]>;
    findOne(id: string): Promise<Doctor>;
    update(id: string, updateDoctorDto: UpdateDoctorDto): Promise<Doctor>;
    remove(id: string): Promise<void>;
}
