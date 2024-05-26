import { RxDashboard } from "react-icons/rx";

export const adminLinks = [
  {
    linkText: `Dashboard`,
    linkTo: "/",
    linkIcon: <RxDashboard />,
  },
  {
    linkText: `Complains`,
    linkTo: "/dashboard/district-admin/all-complaints",
    linkIcon: <RxDashboard />,
  },
  {
    linkText: `Incentives`,
    linkTo: "/dashboard/district-admin/all-incentives",
    linkIcon: <RxDashboard />,
  },

  {
    linkText: `Community Waste Movements`,
    linkTo: "/dashboard/district-admin/community-waste-movements",
    linkIcon: <RxDashboard />,
  },
];
