type PriorityInfo = {
  label: string;
  color: string;
};

export const priorityCodes : Record<number, PriorityInfo> = {
    3: {
        label: "Low",
        color: "#4CAF50",
    },
    2: {
        label: "Medium",
        color: "#FF9800",
    },
    1: {
        label: "High",
        color: "#F44336",
    }
}