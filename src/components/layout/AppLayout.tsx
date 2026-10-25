import { useLocation } from "react-router";
import useSmoothScroll from "../../hooks/useSmoothScroll";
import CustomCursor from "../ui/CustomCursor";
import Header from "./Header";
import RouteTransition from "./RouteTransition";

export default function AppLayout() {
  const location = useLocation();

  useSmoothScroll(location.key);

  return (
    <>
      <CustomCursor />
      <Header />
      <RouteTransition />
    </>
  );
}
