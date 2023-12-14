import { Migration } from '@mikro-orm/migrations';

export class Migration20231123200715 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "product" add column "count" int not null;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "product" drop column "count";');
  }

}
