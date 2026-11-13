/**
 * Roles a HireLoop account can have. Shared by the sign-up form (UI)
 * and the better-auth server config so both stay in sync.
 */
export const ROLES = ["seeker", "recruiter", "admin"] as const;

export type Role = (typeof ROLES)[number];

export const ROLE_LABELS: Record<Role, string> = {
  seeker: "Job Seeker",
  recruiter: "Recruiter",
  admin: "Admin",
};
