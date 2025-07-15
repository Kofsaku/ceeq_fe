export enum Action {
  DELAY = "delay",
  BRANCH = "branch",
  MESSAGE = "message",
  TASK = "task",
}

export enum MSG_ITEM {
  EMAIL = "EMAIL",
  SMS = "SMS",
  LINE = "LINE",
  X = "X",
  FACEBOOK = "FACEBOOK",
  INSTAGRAM = "INSTAGRAM",
}

export enum MSG_LABEL {
  EMAIL = "メール",
  SMS = "SMS",
  LINE = "LINE",
  X = "X",
  FACEBOOK = "Facebook",
  INSTAGRAM = "Instagram",
}

export type OptionType = {
  value: string | number;
  label: string;
};
