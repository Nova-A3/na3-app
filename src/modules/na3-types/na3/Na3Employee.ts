import type { Na3Event } from "./Na3Event";

export type Na3Employee = {
  createdAt: string;
  departmentIds: string[];
  displayName: string;
  email: string | null;
  eventHistory: Na3Event[];
  firstName: string;
  id: string;
  isActive: boolean;
  isEmailVerified: boolean;
  isSuper: boolean;
  lastName: string;
  middleName: string | null;
  notificationTokens: string[];
  photoUrl: string | null;
  privileges: string[];
  registrationId: string;
  roleIds: string[];
  updatedAt: string;
};
