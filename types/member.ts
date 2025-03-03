import { SyncableEntity } from "@/services/syncService";

export interface Member extends SyncableEntity {
  id?: number;
  memberId?: string;
  photo?: string;
  title: string;
  name: string;
  given_name: string;
  family_name: string;
  sex: "male" | "female";
  dateofbirth?: string;
  marital_status?: string;
  occupation?: string;
  education?: string;
  nid_type?: "VOTER_ID" | "GHANA_CARD" | "DRIVER_LICENSE" | "NHIS_CARD";
  nid?: string;
  primary_phone: string;
  secondary_phone?: string;
  email?: string;
  creator: string;
  created_at?: string;
  updated_at?: string;
}
