import Role from 'src/auth/enums/role.enum';
import { User } from 'src/users/entity/users.entity';
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class Note {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column({
    type: "enum",
    enum: ["done", "undone"],
    default: 'undone',
  })
  status: string;

  @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
  createdAt: Date;

  @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
  updatedAt: Date;
  
  @Column()
  userId: string;

  @ManyToOne(() => User, (user) => user.notes, {
    eager: true,
    onDelete: 'CASCADE',
  })
  user: User;
}