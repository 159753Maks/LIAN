export enum AllowedMimeEnum {
  JPEG = 'image/jpeg',
  JPG = 'image/jpg',
  PNG = 'image/png',
}

//create table knex_migrations
// (
//     id             serial
//         primary key,
//     name           varchar(255),
//     batch          integer,
//     migration_time timestamp with time zone
// );
//
// alter table knex_migrations
//     owner to degget;
//
// create table knex_migrations_lock
// (
//     index     serial
//         primary key,
//     is_locked integer
// );
//
// alter table knex_migrations_lock
//     owner to degget;
//
// create table "user"
// (
//     uid         uuid         not null
//         primary key,
//     "firstName" varchar(255) not null,
//     "lastName"  varchar(255) not null,
//     email       varchar(255) not null
//         constraint user_email_unique
//             unique,
//     phone       varchar(24),
//     password    varchar(255) not null,
//     role        text
//         constraint user_role_check
//             check (role = ANY (ARRAY ['ADMIN'::text, 'MANAGER'::text, 'USER'::text]))
// );
//
// alter table "user"
//     owner to degget;
//
// create table product
// (
//     uid              uuid              not null
//         primary key,
//     title            varchar(255)      not null,
//     description      varchar(255)      not null,
//     cost             double precision,
//     count            integer default 0 not null,
//     "subDescription" varchar(255)
// );
//
// alter table product
//     owner to degget;
//
// create table category
// (
//     uid   uuid         not null
//         primary key,
//     title varchar(255) not null
// );
//
// alter table category
//     owner to degget;
//
// create table "categoryProduct"
// (
//     uid           uuid not null
//         primary key,
//     "productUid"  uuid
//         constraint categoryproduct_productuid_foreign
//             references product,
//     "categoryUid" uuid
//         constraint categoryproduct_categoryuid_foreign
//             references category
// );
//
// alter table "categoryProduct"
//     owner to degget;
//
// create table image
// (
//     uid          uuid         not null
//         primary key,
//     "productUid" uuid
//         constraint image_productuid_foreign
//             references product,
//     url          varchar(255) not null
// );
//
// alter table image
//     owner to degget;
