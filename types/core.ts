export interface User {
  id: number;
  name: string;
  phone: string;
  email?: string;
  sex: "male" | "female";
  givenName?: string;
  familyName?: string;
  dateOfBirth?: string;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface MigrationSchema {
  up: string;
  down: string;
}

export interface Tenant {
  id: string;
  name: string;
  slug?: string;
  created_at: string;
  updated_at: string;
}

export interface SyncMeta {
  id: number;
  entity_name: string;
  last_synced: number;
}

export interface ResponseType<T> {
  result: T;
  success: boolean;
  message: string;
}
