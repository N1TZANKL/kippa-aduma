import PageLayout from "components/layouts/MainLayout";
import Table from "components/general/Table";

const Passwords = () => <PageLayout>
    <Table
              columns={[
                { title: "Adı", field: "name" },
                { title: "Soyadı", field: "surname" },
                { title: "Doğum Yılı", field: "birthYear", type: "numeric" },
                {
                  title: "Doğum Yeri",
                  field: "birthCity",
                  lookup: { 34: "İstanbul", 63: "Şanlıurfa" },
                },
              ]}
              data={[
                {
                  name: "Mehmet",
                  surname: "Baran",
                  birthYear: 1987,
                  birthCity: 63,
                },
              ]}
              title="Demo Title"
     />
</PageLayout>;
export default Passwords;
