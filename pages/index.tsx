import { withUserSession } from "utils/session";
import PageLayout from "src/components/layouts/MainLayout";

export default function Home(): JSX.Element {
    return <PageLayout>Home</PageLayout>;
}

export const getServerSideProps = withUserSession();
