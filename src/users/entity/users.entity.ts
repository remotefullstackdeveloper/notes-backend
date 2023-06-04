import Role from 'src/auth/enums/role.enum';
import { Note } from 'src/notes/entity/notes.entity';
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({unique: true})
  email: string;


  @Column({
    type: "enum",
    enum: ["pending", "active", "blocked"],
    default: 'active',
  })
  status: "pending"| "active"| "blocked";

  @Column({select: false})
  password: string;
  
  @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
  createdAt: Date;

  @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
  updatedAt: Date;

  @Column({
    type: 'enum',
    enum: Role,
    array: true,
    default: [Role.User]
  })
  public roles: Role[]


 
  
  @OneToMany(() => Note, notes => notes.user, { onDelete: 'CASCADE' })
  notes: Note[];
}

