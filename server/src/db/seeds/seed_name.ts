import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {

    // Inserts seed entries
    await knex("category").insert([
        { uid: "2d4d3f2e-c31c-4460-b5f5-3cd11ebd0000", title: "rowValue1" },
        { uid: "2d4d3f2e-c31c-4460-b5f5-3cd11ebd0001", title: "rowValue2" },
        { uid: "2d4d3f2e-c31c-4460-b5f5-3cd11ebd0002", title: "rowValue3" }
    ]);

    await knex("product").insert([
        {
            uid: "2d4d3f2e-c31c-4460-b5f5-3cd11ebd0000",
            title: "rowValue1",
            description: "rowValue1",
            cost: 1,
            count: 1,
        },
    ]);

    await knex("categoryProduct").insert([
        {
            uid: "2d4d3f2e-c31c-4460-b5f5-3cd11ebd0000",
            categoryUid: "2d4d3f2e-c31c-4460-b5f5-3cd11ebd0000",
            productUid: "2d4d3f2e-c31c-4460-b5f5-3cd11ebd0000",
        },
    ]);
};
