export type Permission = "write-exam-bank";

interface AdminInformation {
  email: string;
  permissions: Permission[];
}

export const admins: AdminInformation[] = [
  { email: "webdev@mathsoc.uwaterloo.ca", permissions: ["write-exam-bank"] },
  { email: "president@mathsoc.uwaterloo.ca", permissions: ["write-exam-bank"] },
  { email: "vpa@mathsoc.uwaterloo.ca", permissions: ["write-exam-bank"] },
  { email: "vpc@mathsoc.uwaterloo.ca", permissions: ["write-exam-bank"] },
  { email: "vpi@mathsoc.uwaterloo.ca", permissions: ["write-exam-bank"] },
  { email: "vpo@mathsoc.uwaterloo.ca", permissions: ["write-exam-bank"] },
  {
    email: "exam_director@mathsoc.uwaterloo.ca",
    permissions: ["write-exam-bank"],
  },
];
