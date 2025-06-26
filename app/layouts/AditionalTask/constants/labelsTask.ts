import { MdOutlineMenuBook } from "react-icons/md";
import Label from "../Label/Label";

export const labelOptions = [
    { label: 'Study', value: 'Study', icon: Label},
    { label: 'Work', value: 'Work', icon: Label },
    { label: 'Personal', value: 'Personal', icon: Label },
    { label: 'Events', value: 'Events', icon: Label },
    { label: 'Project', value: 'Project', icon: Label },
    { label: 'Recurrent', value: 'Recurrent', icon: Label },
]

export enum LabelType {
    Study = 'Study',
    Work = 'Work',
    Personal = 'Personal',
    Events = 'Events',
    Project = 'Project',
    Recurrent = 'Recurrent',
}