import Home from "pages/home";
import { withUserSession } from "utils/session";

export default Home;

export const getServerSideProps = withUserSession();
