import {
    BaseEntity as TypeOrmBaseEntity,
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
    Entity,
  } from 'typeorm';
  
  @Entity()
  export class BaseEntity extends TypeOrmBaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: Uuid;
  
    @CreateDateColumn({
      type: 'timestamp',
      name: 'created',
    })
    created: Date;
  
    @UpdateDateColumn({
      type: 'timestamp',
      name: 'updated',
    })
    updated: Date;
  
    @DeleteDateColumn({
      type: 'timestamp',
      name: 'deleted',
    })
    deleted: Date;
  
    @Column({ nullable: true, type: 'uuid' })
    updatedBy: Uuid;
  }
  