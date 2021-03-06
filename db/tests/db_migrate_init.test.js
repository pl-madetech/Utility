import AppContainer from "../../src/containers/AppContainer";

describe("db-migrate databse setup ready", () => {

    const container = AppContainer.getInstance();

    it("do we have an admin user on user table", async () => {
        const db = await container.getDb();
        const adminUser = await retrieveAdminUser(db);

        expect(adminUser).toBeDefined();
        expect(adminUser.recordset).toBeDefined();
        expect(adminUser.recordset).toMatchObject([
            {
                id: expect.any(Number),
                email: expect.stringContaining("@nhs.co.uk"),
                created_at: expect.any(Date),
                updated_at: expect.any(Date),
                type: "admin",
                organisation_id: null,
                uuid: expect.stringMatching(/[a-fA-F0-9]{8}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{12}/),
                change_password: false,
                status: 1,
            }
        ]);

        // close resource else blocks process.
        db.close();
    });

    // TODO create test for organisations, check if the table as more than one record.
});

const retrieveAdminUser = async (db) => {
    return await db.request().query("select * from dbo.[user] where type='admin'")
};