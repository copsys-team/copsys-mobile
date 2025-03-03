export interface ScreenLockType {
  isUnlocked: boolean;
  authenticate: () => Promise<void>;
  lockApp: () => void;
}

