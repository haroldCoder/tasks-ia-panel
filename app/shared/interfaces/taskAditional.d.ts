import { TypeLabels } from "../enums/typeLabels.enum";

export interface TaskAditional {
    start_date: string;
    end_date: string;
    type: Array<TypeLabels>;
}