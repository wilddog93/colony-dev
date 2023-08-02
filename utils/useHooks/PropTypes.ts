// user
export type UserProps = {
  id?: number | any;
  email?: string | any;
  firstName?: string | any;
  lastName?: string | any;
  nickName?: string | any;
  documentNumber?: string | any;
  documentSource?: string | any;
  profileImage?: string | any;
  phoneNumber?: string | any;
  birthday?: string | any;
  gender?: string | any;
  userAddress?: string | any;
};
// user end

// projects
export type ProjectTypeProps = {
  id?: number | any;
  createdAt?: string | any;
  updatedAt?: string | any;
  projectTypeName?: string | any;
  projectTypeDescription?: string | any;
  projectTypePriority?: string | any;
};

export type ProjectProps = {
  id?: number | any;
  createdAt?: string | any;
  updatedAt?: string | any;
  projectCode?: null;
  projectName?: string | any;
  projectDescription?: string | any;
  scheduleStart?: string | any;
  scheduleEnd?: string | any;
  executionStart?: string | any;
  executionEnd?: string | any;
  projectStatus?: string | any;
  totalTask?: number | any;
  totalTaskCompleted?: number | any;
  projectType?: ProjectTypeProps | any;
  issue?: any | null;
  projectMembers?: any | any[];
};
// end project

// task
export type TaskCategoryProps = {
  id?: number | any;
  createdAt?: string | any;
  updatedAt?: string | any;
  taskCategoryName?: string | any;
  taskCategoryDescription?: string | any;
  taskCategoryFillColor?: string | any;
  taskCategoryTextColor?: string | any;
};

export type TaskProps = {
  id?: number | any;
  createdAt?: string | any;
  updatedAt?: string | any;
  taskCode?: string | any;
  taskName?: string | any;
  taskDescription?: string | any;
  taskOrder?: number | any;
  scheduleStart?: string | any;
  scheduleEnd?: string | any;
  executionStart?: string | any;
  executionEnd?: string | any;
  taskStatus?: string | any;
  totalSubTask?: number | any;
  totalAttachment?: number | any;
  totalComment?: number | any;
  project?: ProjectProps | any;
  taskCategories: TaskCategoryProps[] | any[];
  taskAssignees: UserProps[] | any[];
};
// end task

// subtask
export type SubTaskProps = {
  id?: number | any;
  createdAt?: string | any;
  updatedAt?: string | any;
  subTaskName?: string | any;
  subTaskDescription?: string | any;
  subTaskStatus?: boolean;
  subTaskAssignees?: UserProps[] | any[];
};
// subtask end

// options
export interface OptionProps {
  value: string | any;
  label: string | any;
}

// issues
export interface IssueCategoryProps {
  id?: number | any;
  createdAt?: string | any;
  updatedAt?: string | any;
  issueCategoryCode: string | any;
  issueCategoryName: string | any;
  issueCategoryDescription: string | any;
}

export interface IssueTypeProps {
  id: 1;
  createdAt?: string | any;
  updatedAt?: string | any;
  issueTypeCode: string | any;
  issueTypeName: string | any;
  issueTypeDescription: string | any;
}

export interface OccupantProps {
  id?: number | any;
  createdAt?: string | any;
  updatedAt?: string | any;
  startTime?: string | any;
  endTime?: string | any;
  isMobileDefault?: boolean;
  user?: UserProps;
}

export interface IssueProps {
  id: number | any;
  createdAt: string | any;
  updatedAt: string | any;
  issueCode: string | any;
  issueName: string | any;
  issueDescription: string | any;
  complaintSource: string | any;
  complainantName: string | any;
  phoneNumber: string | any;
  issueResponse: string | any;
  issueStatus: string | any;
  issueCategory: IssueCategoryProps;
  issueType: IssueTypeProps;
  occupant: OccupantProps;
  project: ProjectProps | any;
  issueCreator: UserProps;
}