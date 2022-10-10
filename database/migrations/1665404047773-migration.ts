import { MigrationInterface, QueryRunner } from "typeorm";

export class migration1665404047773 implements MigrationInterface {
    name = 'migration1665404047773'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "parent_entity" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, "dateOfBirth" date NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, CONSTRAINT "UQ_997a357b42b8140b01a554edfe8" UNIQUE ("email"), CONSTRAINT "PK_ab7017bfc43e55d226ec1d84132" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_997a357b42b8140b01a554edfe" ON "parent_entity" ("email") `);
        await queryRunner.query(`CREATE TABLE "baby_entity" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, "isActive" boolean NOT NULL DEFAULT false, "dateOfBirth" date NOT NULL, CONSTRAINT "PK_2d39e4359c6572ff5bd70cc6474" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."food_introduction_entity_result_enum" AS ENUM('Success', 'Failure')`);
        await queryRunner.query(`CREATE TABLE "food_introduction_entity" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "foodName" character varying NOT NULL, "date" date NOT NULL, "preparation" character varying, "presentation" character varying, "result" "public"."food_introduction_entity_result_enum", "babyId" uuid, CONSTRAINT "PK_34f552abb558c96926aa99a6513" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."share_baby_invitation_entity_status_enum" AS ENUM('Accepted', 'Pending', 'Rejected')`);
        await queryRunner.query(`CREATE TABLE "share_baby_invitation_entity" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "date" TIMESTAMP WITH TIME ZONE NOT NULL, "otherParentEmail" character varying NOT NULL, "status" "public"."share_baby_invitation_entity_status_enum" NOT NULL DEFAULT 'Pending', "requesterId" uuid, "babyId" uuid, CONSTRAINT "PK_ad6f99264de6b9fc175ddbda9b1" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "parent_entity_children_baby_entity" ("parentEntityId" uuid NOT NULL, "babyEntityId" uuid NOT NULL, CONSTRAINT "PK_e73d0e0b10334c41c08b865880b" PRIMARY KEY ("parentEntityId", "babyEntityId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_136905f9335e8ba5ffd5240aa9" ON "parent_entity_children_baby_entity" ("parentEntityId") `);
        await queryRunner.query(`CREATE INDEX "IDX_d6fb889911b1f56646559b90c7" ON "parent_entity_children_baby_entity" ("babyEntityId") `);
        await queryRunner.query(`ALTER TABLE "food_introduction_entity" ADD CONSTRAINT "FK_c13a097a156eb3b979b63657142" FOREIGN KEY ("babyId") REFERENCES "baby_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "share_baby_invitation_entity" ADD CONSTRAINT "FK_48eda7089a35802cc1cd19ec539" FOREIGN KEY ("requesterId") REFERENCES "parent_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "share_baby_invitation_entity" ADD CONSTRAINT "FK_bb59af6989f1e9621ed8e7a7ff9" FOREIGN KEY ("babyId") REFERENCES "baby_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "parent_entity_children_baby_entity" ADD CONSTRAINT "FK_136905f9335e8ba5ffd5240aa9c" FOREIGN KEY ("parentEntityId") REFERENCES "parent_entity"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "parent_entity_children_baby_entity" ADD CONSTRAINT "FK_d6fb889911b1f56646559b90c7a" FOREIGN KEY ("babyEntityId") REFERENCES "baby_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "parent_entity_children_baby_entity" DROP CONSTRAINT "FK_d6fb889911b1f56646559b90c7a"`);
        await queryRunner.query(`ALTER TABLE "parent_entity_children_baby_entity" DROP CONSTRAINT "FK_136905f9335e8ba5ffd5240aa9c"`);
        await queryRunner.query(`ALTER TABLE "share_baby_invitation_entity" DROP CONSTRAINT "FK_bb59af6989f1e9621ed8e7a7ff9"`);
        await queryRunner.query(`ALTER TABLE "share_baby_invitation_entity" DROP CONSTRAINT "FK_48eda7089a35802cc1cd19ec539"`);
        await queryRunner.query(`ALTER TABLE "food_introduction_entity" DROP CONSTRAINT "FK_c13a097a156eb3b979b63657142"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_d6fb889911b1f56646559b90c7"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_136905f9335e8ba5ffd5240aa9"`);
        await queryRunner.query(`DROP TABLE "parent_entity_children_baby_entity"`);
        await queryRunner.query(`DROP TABLE "share_baby_invitation_entity"`);
        await queryRunner.query(`DROP TYPE "public"."share_baby_invitation_entity_status_enum"`);
        await queryRunner.query(`DROP TABLE "food_introduction_entity"`);
        await queryRunner.query(`DROP TYPE "public"."food_introduction_entity_result_enum"`);
        await queryRunner.query(`DROP TABLE "baby_entity"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_997a357b42b8140b01a554edfe"`);
        await queryRunner.query(`DROP TABLE "parent_entity"`);
    }

}
