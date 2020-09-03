import { ManagerModel } from "./manager.model";

export interface EmployeeProfileModel {
  _id: string;
  employeeId: string;
  firstName: string;
  familyName: string;
  middleName: string;
  address: string;
  designation: string;
  baseLocation: string;
  workEmail: string;
  mobileNo: string;
  gender: string;
  workContactNo: string;
  bloodGroup: string;
  dateOfBirth: Date;
  dateOfJoining: Date;
  image: any;
  reportingManager: ManagerModel;
  hrManager: ManagerModel;
}
