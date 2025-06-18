import { Tasks } from "./tasks";

export interface TaskUpdate extends Omit<Tasks, 'id' | 'completed' | 'userId'>{}