import AvailabilitySlots from "../pages/AvailabilitySlots";
import LoginPage from "../pages/LoginPage";
import SignupPage from "../pages/SignupPage";
import Landing from '../pages/Landing';
import TagTeam from "../pages/TagTeam";
import TagTeamAvailability from "../pages/TagTeamAvailability";
import DashBoardInterviewer from "../pages/DashboardInterviewer";
import InterviewersList from "../pages/InterviewersList";
export const appRoutes = [
  {
    path: "/login",
    component: <LoginPage />,
  },
  {
    path: "/signup",
    component: <SignupPage />,
  },
  {
    path: "/availabilitySlots",
    component: <AvailabilitySlots/>
  },
  {
    path: "/tagTeamAvailability",
    component: <TagTeamAvailability/>
  },
  {
    path: "/dashboardInterviewer",
    component: <DashBoardInterviewer/>
  },
  {
    path: "/tagTeam",
    component: <TagTeam/>
  },
  {
    path: "/landing",
    component: <Landing/>
  },
  {
    path: "/interviewerList",
    component: <InterviewersList/>
  }
];