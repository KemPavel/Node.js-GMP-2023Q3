import { Migration } from '@mikro-orm/migrations';

export class Migration20231123190635 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "user" ("uuid" varchar(255) not null, "cart_uuid" varchar(255) null, constraint "user_pkey" primary key ("uuid"));');
    this.addSql('alter table "user" add constraint "user_cart_uuid_unique" unique ("cart_uuid");');

    this.addSql('create table "order" ("uuid" varchar(255) not null, "user_uuid" varchar(255) not null, constraint "order_pkey" primary key ("uuid"));');

    this.addSql('create table "cart" ("uuid" varchar(255) not null, "is_deleted" boolean not null, "user_uuid" varchar(255) not null, constraint "cart_pkey" primary key ("uuid"));');
    this.addSql('alter table "cart" add constraint "cart_user_uuid_unique" unique ("user_uuid");');

    this.addSql('create table "product" ("uuid" varchar(255) not null, "title" varchar(255) not null, "description" varchar(255) not null, "price" varchar(255) not null, "cart_uuid" varchar(255) not null, constraint "product_pkey" primary key ("uuid"));');

    this.addSql('alter table "user" add constraint "user_cart_uuid_foreign" foreign key ("cart_uuid") references "cart" ("uuid") on update cascade on delete set null;');

    this.addSql('alter table "order" add constraint "order_user_uuid_foreign" foreign key ("user_uuid") references "user" ("uuid") on update cascade;');

    this.addSql('alter table "cart" add constraint "cart_user_uuid_foreign" foreign key ("user_uuid") references "user" ("uuid") on update cascade;');

    this.addSql('alter table "product" add constraint "product_cart_uuid_foreign" foreign key ("cart_uuid") references "cart" ("uuid") on update cascade;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "order" drop constraint "order_user_uuid_foreign";');

    this.addSql('alter table "cart" drop constraint "cart_user_uuid_foreign";');

    this.addSql('alter table "user" drop constraint "user_cart_uuid_foreign";');

    this.addSql('alter table "product" drop constraint "product_cart_uuid_foreign";');

    this.addSql('drop table if exists "user" cascade;');

    this.addSql('drop table if exists "order" cascade;');

    this.addSql('drop table if exists "cart" cascade;');

    this.addSql('drop table if exists "product" cascade;');
  }

}
