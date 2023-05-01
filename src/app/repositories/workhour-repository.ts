import { type IWorkhour } from '../entities/schemas/workhour.schema';

export abstract class WorkhouRepository {
    abstract create(notification: IWorkhour): Promise<void>;
}
