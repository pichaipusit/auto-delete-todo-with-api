import axios from "axios";
import { DepartmentSummary, User } from "../types/user.types";

export async function getGroupedUserSummary(): Promise<
  Record<string, DepartmentSummary>
> {
  const { data } = await axios.get<{ users: User[] }>(
    "https://dummyjson.com/users"
  );

  const grouped: Record<string, DepartmentSummary> = {};

  for (const user of data.users) {
    const dept = user.company.department;

    if (!grouped[dept]) {
      grouped[dept] = {
        male: 0,
        female: 0,
        ageRange: "",
        hair: {},
        addressUser: {},
      };
    }

    const summary = grouped[dept];
    user.gender === "male" ? summary.male++ : summary.female++;

    summary.hair[user.hair.color] = (summary.hair[user.hair.color] || 0) + 1;
    summary.addressUser[user.firstName + user.lastName] =
      user.address.postalCode;
  }

  for (const dept in grouped) {
    const deptUsers = data.users.filter((u) => u.company.department === dept);
    const ages = deptUsers.map((u) => u.age);
    const min = Math.min(...ages);
    const max = Math.max(...ages);
    grouped[dept].ageRange = `${min}-${max}`;
  }

  return grouped;
}
