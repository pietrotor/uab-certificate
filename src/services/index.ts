import { ProfessionsService } from './profession.service';
import { StudentsService } from './students.service';

export * from './user.service';

export const professionCore = new ProfessionsService();
export const studentCore = new StudentsService();
