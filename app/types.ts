export type BoardType = {
	id: string;
	boardName: string;
	columns: ColumnType[];
};
export type ColumnType = {
	id: string;
	columnName: string;
	tasks?: TaskType[];
};
export type TaskType = {
	id: string;
	taskName: string;
	subtasks: [];
	description: string;
};

export type BoardLinkType = {
	id: string;
	boardName: string;
	isActive: boolean;
};
