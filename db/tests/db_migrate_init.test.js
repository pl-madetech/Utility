import AppContainer from "../../src/containers/AppContainer";

describe("db-migrate databse setup ready", () => {

    const container = AppContainer.getInstance();

    it("do we have an admin user on user table", async () => {
        const db = await container.getDb();

        const adminUser = await retrieveAdminUser(db);

        expect(adminUser.recordset).toEqual([
            expect.objectContaining({
                type: "admin",
                organisation_id: null,
                change_password: 0,
                status: 1,
            })
        ]);
    });
});

const retrieveAdminUser = async (db) => {
    return await db.request().query("select * from dbo.[user] where type='admin'")
};